package com.accolite.server.controllers;

import com.accolite.server.exceptions.EmailNotFoundException;
import com.accolite.server.exceptions.UserNotAuthorizedException;
import com.accolite.server.models.*;
import com.accolite.server.readers.KeyResultExcelReader;
import com.accolite.server.repository.*;
import com.accolite.server.service.KeyResultService;
import com.accolite.server.service.ReviewCycleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/keyResult")
public class KeyResultController {

    @Autowired
    private KeyResultService keyResultService;

    @Autowired
    private KeyResultRepository keyResultRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ReviewCycleRepository reviewCycleRepository;

    @Autowired
    private ReviewCycleService reviewCycleService;

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping("")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        checkIfAuthorised();
        try {
            List<KeyResult> keyResults = KeyResultExcelReader.readKeyResultsFromExcel(file);
            keyResultService.saveAll(keyResults);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @PostMapping("/{band}")
    public ResponseEntity<String> handleFileUploadSpecific(@RequestParam("file") MultipartFile file, @PathVariable String band) {
        checkIfAuthorised();
        try {
            List<User> users = userRepository.findByBand(band);
            List<KeyResult> keyResults = KeyResultExcelReader.readKeyResultsFromExcel(file);
            for(int i = 0; i < keyResults.size()-1 && keyResults.get(i).getKeyResultName() != ""; i++){
                KeyResult keyResult = keyResults.get(i);
                for (User user: users) {
                    KeyResult keyResult1 = new KeyResult();
                    keyResult1.setKeyResultName(keyResult.getKeyResultName());
                    keyResult1.setUserId(user.getUserId());
                    keyResult1.setDescription(keyResult.getDescription());
                    keyResult1.setWeight(keyResult.getWeight());
                    keyResult1.setPeriod(keyResult.getPeriod());
                    keyResult1.setFinancialYear(keyResult.getFinancialYear());
                    List<ReviewCycle> reviewCycleList = reviewCycleRepository.findByUserId(user.getUserId());
                    keyResult1.setWindowId(reviewCycleList.get(reviewCycleList.size()-1).getWindowId());
                    keyResultRepository.save(keyResult1);
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @GetMapping("/export")
    public ResponseEntity<Object> exportKeyResultsToExcel() {
        checkIfAuthorised();
        List<KeyResult> keyResults = keyResultService.getAllKeyResults();
        String filePath = "key_result_data_export.xlsx";

        try {
            keyResultService.generateKeyResultExcelFile(keyResults,filePath);

            // Read the file content
            byte[] fileContent = Files.readAllBytes(Paths.get(filePath));

            // Create a ByteArrayResource from the file content
            ByteArrayResource resource = new ByteArrayResource(fileContent);

            // Set the Content-Disposition header to prompt the user for download
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=key_result_data_export.xlsx");

            // Return the ResponseEntity with the ByteArrayResource and headers
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(fileContent.length)
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(resource);
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception and return an error response if needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<KeyResult> registerKeyResult(@RequestBody KeyResult keyResult) {
        checkIfAuthorised();
        KeyResult registeredKeyResult = keyResultService.registerKeyResult(keyResult);
        return new ResponseEntity<>(registeredKeyResult, HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<List<KeyResult>> getKeyResults() {
        List<KeyResult> keyResults = keyResultRepository.findAll();
        return new ResponseEntity<>(keyResults, HttpStatus.OK);
    }


    @GetMapping("/keyResultById/{keyResultId}")
    public ResponseEntity<KeyResult> getKeyResultById(@PathVariable Long keyResultId) {
        KeyResult keyResult = keyResultService.getKeyResultById(keyResultId);
        if (keyResult != null) {
            return ResponseEntity.ok(keyResult);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/keyResultById/{keyResultId}")
    public ResponseEntity<KeyResult> updateKeyResult(@PathVariable Long keyResultId, @RequestBody KeyResult updatedKeyResult) {
        checkIfAuthorised();
        KeyResult existingKeyResult = keyResultService.getKeyResultById(keyResultId);

        if (existingKeyResult != null) {
            // Update the existing goal plan with the values from the updatedGoalPlan
            updatedKeyResult.setKeyResultId(existingKeyResult.getKeyResultId());
            // ... (set other fields accordingly)

            KeyResult savedKeyResult = keyResultRepository.save(updatedKeyResult); // Assuming you have a method like this

            return ResponseEntity.ok(updatedKeyResult);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/keyResults")
    public List<KeyResult> getKeyResults(
            @RequestParam Long userId,
            @RequestParam String period,
            @RequestParam Integer year,
            @RequestParam Boolean status) {

        // Assuming you have a method in the repository to fetch key results by userId and period
        List<KeyResult> keyResults = keyResultRepository.findByUserIdAndPeriod(userId, period);
        List<KeyResult> filteredKeyResults = new ArrayList<>();

        for (KeyResult keyResult: keyResults) {
            if(Objects.equals(keyResultRepository.findByKeyResultId(keyResult.getKeyResultId()).getFinancialYear(), year)){
                if(status) {
                    if(keyResult.getRating() != null && keyResult.getRating() != 0) {
                        filteredKeyResults.add(keyResult);
                    }
                } else {
                    if(keyResult.getRating() == null || keyResult.getRating() == 0){
                        filteredKeyResults.add(keyResult);
                    }
                }
            }
        }



        // Assuming the 'financialYear' is present in the KeyResult entity
        // You may need to adjust this based on your actual entity structure
        return filteredKeyResults;
    }

    @GetMapping("/topThreeKeyResults/{userId}")
    public ResponseEntity<List<KeyResult>> getTopThreeKeyResults(@PathVariable Long userId) {
        try {
            // Retrieve the second most latest review cycle by ID
            ReviewCycle secondLatestReviewCycle = reviewCycleService.getSecondLatestReviewCycleByUserId(userId);

            if (secondLatestReviewCycle != null) {
                // Assuming you have a method in the repository to fetch key results by userId and review cycle ID
                List<KeyResult> keyResults = keyResultRepository.findByWindowId(secondLatestReviewCycle.getWindowId());

                // Sort key results by rating in descending order
                keyResults.sort(Comparator.comparingDouble(KeyResult::getRating).reversed());

                // Select the top three key results
                List<KeyResult> topThreeKeyResults = keyResults.stream().limit(3).collect(Collectors.toList());

                return ResponseEntity.ok(topThreeKeyResults);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/bottomThreeKeyResults/{userId}")
    public ResponseEntity<List<KeyResult>> getBottomThreeKeyResults(@PathVariable Long userId) {
        try {
            // Retrieve the second most latest review cycle by ID
            ReviewCycle secondLatestReviewCycle = reviewCycleService.getSecondLatestReviewCycleByUserId(userId);

            if (secondLatestReviewCycle != null) {
                // Assuming you have a method in the repository to fetch key results by userId and review cycle ID
                List<KeyResult> keyResults = keyResultRepository.findByWindowId(secondLatestReviewCycle.getWindowId());

                // Sort key results by rating in ascending order
                keyResults.sort(Comparator.comparingDouble(KeyResult::getRating));

                // Select the bottom three key results
                List<KeyResult> bottomThreeKeyResults = keyResults.stream().limit(3).collect(Collectors.toList());

                return ResponseEntity.ok(bottomThreeKeyResults);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/tasks/{userId}")
    public ResponseEntity<List<Task>> getCurrentTask(@PathVariable Long userId) {
        try {
            // Retrieve the second most latest review cycle by ID
            ReviewCycle latestReviewCycle = reviewCycleService.getLatestReviewCycleByUserId(userId);

            if (latestReviewCycle != null) {
                // Assuming you have a method in the repository to fetch key results by userId and review cycle ID
                List<KeyResult> keyResults = keyResultRepository.findByWindowId(latestReviewCycle.getWindowId());

                // Sort key results by rating in ascending order
                keyResults.sort(Comparator.comparingDouble(KeyResult::getWeight));
                List<Task> taskList = new ArrayList<>();
                // Select the bottom three key results
                for(KeyResult keyResult: keyResults){
                    List<Task> newTaskList = taskRepository.findByKeyResultId(keyResult.getKeyResultId());
                    for (Task task : newTaskList){
                        taskList.add(task);
                    }
                }
                return ResponseEntity.ok(taskList);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    private void checkIfAuthorised() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(authentication.getName()).orElseThrow(() -> new EmailNotFoundException("Email not found"));
        if(!user.getRoles().contains("Admin")) {
            throw new UserNotAuthorizedException("User is not Authorized");
        }
    }
}
