package com.accolite.server.controllers;

import com.accolite.server.models.KeyResult;
import com.accolite.server.models.User;
import com.accolite.server.readers.GoalPlanExcelReader;
import com.accolite.server.models.GoalPlan;
import com.accolite.server.repository.GoalPlanRepository;
import com.accolite.server.repository.UserRepository;
import com.accolite.server.service.GoalPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Controller
public class GoalPlanController {

    @Autowired
    private GoalPlanService goalPlanService;

    @Autowired
    private GoalPlanRepository goalPlanRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/goalPlan")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            List<GoalPlan> goalPlans = GoalPlanExcelReader.readGoalPlansFromExcel(file);
            goalPlanService.saveAll(goalPlans);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @PostMapping("/goalPlan/{band}")
    public ResponseEntity<String> handleFileUploadSpecific(@RequestParam("file") MultipartFile file, @PathVariable String band) {
        try {
            List<User> users = userRepository.findByBand(band);
            List<GoalPlan> goalPlans = GoalPlanExcelReader.readGoalPlansFromExcel(file);
            GoalPlan goalPlan = goalPlans.get(0);
            for (User user: users) {
                GoalPlan goalPlan1 = new GoalPlan();
                goalPlan1.setFinancialYear(goalPlan.getFinancialYear());
                goalPlan1.setUserId(user.getUserId());
                goalPlanRepository.save(goalPlan1);
            }
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @GetMapping("/export")
    public ResponseEntity<Object> exportGoalPlansToExcel() {
        List<GoalPlan> goalPlans = goalPlanService.getAllGoalPlans();
        String filePath = "goal_plan_data_export.xlsx";

        try {
            goalPlanService.generateGoalPlanExcelFile(goalPlans,filePath);

            // Read the file content
            byte[] fileContent = Files.readAllBytes(Paths.get(filePath));

            // Create a ByteArrayResource from the file content
            ByteArrayResource resource = new ByteArrayResource(fileContent);

            // Set the Content-Disposition header to prompt the user for download
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=goal_plan_data_export.xlsx");

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

    @GetMapping("/goalPlan/{userId}")
    public ResponseEntity<List<GoalPlan>> getGoalPlansByUserId(@PathVariable Long userId) {
        List<GoalPlan> goalPlans = goalPlanService.getGoalPlansByUserId(userId);
        return ResponseEntity.ok(goalPlans);
    }

    @GetMapping("/goalPlan")
    public ResponseEntity<List<GoalPlan>> getGoalPlans() {
        List<GoalPlan> goalPlans = goalPlanRepository.findAll();
        return new ResponseEntity<>(goalPlans, HttpStatus.OK);
    }

    @PostMapping("/goalPlan/register")
    public ResponseEntity<GoalPlan> registerGoalPlan(@RequestBody GoalPlan goalPlan) {
        GoalPlan registeredGoalPlan = goalPlanService.registerGoalPlan(goalPlan);
        return new ResponseEntity<>(registeredGoalPlan, HttpStatus.CREATED);
    }

    @GetMapping("/goalPlanById/{goalPlanId}")
    public ResponseEntity<GoalPlan> getGoalPlanById(@PathVariable Long goalPlanId) {
        GoalPlan goalPlan = goalPlanService.getGoalPlanById(goalPlanId);
        if (goalPlan != null) {
            return ResponseEntity.ok(goalPlan);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/goalPlanById/{goalPlanId}")
    public ResponseEntity<GoalPlan> updateGoalPlan(@PathVariable Long goalPlanId, @RequestBody GoalPlan updatedGoalPlan) {
        GoalPlan existingGoalPlan = goalPlanService.getGoalPlanById(goalPlanId);

        if (existingGoalPlan != null) {
            // Update the existing goal plan with the values from the updatedGoalPlan
            updatedGoalPlan.setGoalPlanId(existingGoalPlan.getGoalPlanId());
            // ... (set other fields accordingly)

            GoalPlan savedGoalPlan = goalPlanRepository.save(updatedGoalPlan); // Assuming you have a method like this

            return ResponseEntity.ok(savedGoalPlan);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
