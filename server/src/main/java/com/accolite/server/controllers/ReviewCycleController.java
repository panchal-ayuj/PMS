package com.accolite.server.controllers;

import com.accolite.server.models.*;
import com.accolite.server.readers.ReviewCycleExcelReader;
import com.accolite.server.repository.GoalPlanRepository;
import com.accolite.server.repository.KeyResultRepository;
import com.accolite.server.repository.ReviewCycleRepository;
import com.accolite.server.repository.UserRepository;
import com.accolite.server.service.ReminderService;
import com.accolite.server.service.ReviewCycleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/reviewCycle")
public class ReviewCycleController {

    @Autowired
    private ReviewCycleService reviewCycleService;

    @Autowired
    private ReviewCycleRepository reviewCycleRepository;
    @Autowired
    private ReminderService reminderService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private KeyResultRepository keyResultRepository;

    @Autowired
    private GoalPlanRepository goalPlanRepository;

    @PostMapping("")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            List<ReviewCycle> reviewCycles = ReviewCycleExcelReader.readReviewCyclesFromExcel(file);
            reviewCycleService.saveAll(reviewCycles);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @PostMapping("/{band}")
    public ResponseEntity<String> handleFileUploadSpecific(@RequestParam("file") MultipartFile file, @PathVariable String band) {
        try {
            List<User> users = userRepository.findByBand(band);
            List<ReviewCycle> reviewCycles = ReviewCycleExcelReader.readReviewCyclesFromExcel(file);
            ReviewCycle reviewCycle = reviewCycles.get(0);
            System.out.println(reviewCycle);
            for (User user: users) {
                ReviewCycle reviewCycle1 = new ReviewCycle();
                reviewCycle1.setUserId(user.getUserId());
                reviewCycle1.setStartDate(reviewCycle.getStartDate());
                reviewCycle1.setEndDate(reviewCycle.getEndDate());
                reviewCycle1.setPeriod(reviewCycle.getPeriod());
                reviewCycle1.setReviewStatus(reviewCycle.getReviewStatus());
                reviewCycleRepository.save(reviewCycle1);
            }
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ReviewCycle> registerReviewCycle(@RequestBody ReviewCycle reviewCycle) {
        ReviewCycle registeredReviewCycle = reviewCycleService.registerReviewCycle(reviewCycle);
        return new ResponseEntity<>(registeredReviewCycle, HttpStatus.CREATED);
    }
    @GetMapping("/export")
    public ResponseEntity<Object> exportReviewCyclesToExcel() {
        List<ReviewCycle> reviewCycles = reviewCycleService.getAllReviewCycles();
        String filePath = "review_cycle_data_export.xlsx";

        try {
            reviewCycleService.generateReviewCycleExcelFile(reviewCycles,filePath);

            // Read the file content
            byte[] fileContent = Files.readAllBytes(Paths.get(filePath));

            // Create a ByteArrayResource from the file content
            ByteArrayResource resource = new ByteArrayResource(fileContent);

            // Set the Content-Disposition header to prompt the user for download
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=review_cycle_data_export.xlsx");

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

    @GetMapping("")
    public ResponseEntity<List<ReviewCycle>> getKeyResults() {
        List<ReviewCycle> reviewCycles = reviewCycleRepository.findAll();
        return new ResponseEntity<>(reviewCycles, HttpStatus.OK);
    }

    @GetMapping("/reviewCycleById/{reviewCycleId}")
    public ResponseEntity<ReviewCycle> getReviewCycleById(@PathVariable Long reviewCycleId) {
        ReviewCycle reviewCycle = reviewCycleService.getReviewCycleById(reviewCycleId);
        if (reviewCycle != null) {
            return ResponseEntity.ok(reviewCycle);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/reviewCycleById/{reviewCycleId}")
    public ResponseEntity<ReviewCycle> updateReviewCycle(@PathVariable Long reviewCycleId, @RequestBody ReviewCycle updatedReviewCycle) {
        ReviewCycle existingReviewCycle = reviewCycleService.getReviewCycleById(reviewCycleId);

        if (existingReviewCycle != null) {
            // Update the existing goal plan with the values from the updatedGoalPlan
            updatedReviewCycle.setWindowId(existingReviewCycle.getWindowId());
            // ... (set other fields accordingly)

            ReviewCycle savedReviewCycle = reviewCycleRepository.save(updatedReviewCycle); // Assuming you have a method like this

            return ResponseEntity.ok(updatedReviewCycle);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PostMapping("/send-reminder")
    public ResponseEntity<String> sendReminderEmailsManually() {
        reminderService.sendReminderEmailsForPendingReviews();
        return ResponseEntity.ok("Reminder emails sent successfully.");
    }

    @GetMapping("/user-feedback/{userId}")
    public ResponseEntity<String> getUserFeedbackForMostRecentCycle(@PathVariable Long userId) {
        try {
            String userFeedback = reviewCycleService.getUserFeedbackForMostRecentCycle(userId);
            return ResponseEntity.ok(userFeedback);
        } catch (Exception e) {
            // Handle errors appropriately
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving user feedback");
        }
    }
    @PutMapping("/user-feedback/{userId}")
    public ResponseEntity<String> updateUserFeedbackForMostRecentCycle(
            @PathVariable Long userId,
            @RequestBody String userFeedback) {
        try {
            reviewCycleService.updateUserFeedbackForMostRecentCycle(userId, userFeedback);
            return ResponseEntity.ok("User feedback updated successfully");
        } catch (Exception e) {
            // Handle errors appropriately
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating user feedback");
        }
    }

    @PostMapping("/addFeedback/{useApi}/{reviewCycleId}/{managerId}")
    public ResponseEntity<String> addFeedbackToReviewCycle(@PathVariable Long useApi,@PathVariable Long reviewCycleId, @PathVariable Long managerId,@RequestBody String feedback) {
        try {
            // Retrieve the review cycle by ID
            ReviewCycle reviewCycle = reviewCycleService.getReviewCycleById(reviewCycleId);

            if (reviewCycle != null) {
                // Add the feedback to the review cycle
                if(useApi == 0) {
                    reviewCycle.setFeedback(feedback);
                    reviewCycle.setReviewerId(managerId);
                    List<KeyResult> keyResultList = keyResultRepository.findByWindowId(reviewCycleId);
                    Double rating = 0.0;
                    Integer totalWeight = 0;
                    for(KeyResult keyResult: keyResultList){
                        rating += keyResult.getRating() * keyResult.getWeight();
                        totalWeight += keyResult.getWeight();
                    }
                    rating = rating/totalWeight;
                    reviewCycle.setOverallRating(String.format("%.3f", rating));
                    reviewCycle.setReviewStatus("Reviewed");
                } else if(useApi == 1){
                    reviewCycle.setSeniorRMfeedback(feedback);
                    reviewCycle.setSeniorRMId(managerId);
                } else if(useApi == 2){
                    reviewCycle.setSuperSeniorRMfeedback(feedback);
                    reviewCycle.setSuperSeniorRMId(managerId);
                }

                // You may need to handle other feedback-related logic

                // Save the updated review cycle
                ReviewCycle savedReviewCycle = reviewCycleRepository.save(reviewCycle);

                return ResponseEntity.status(HttpStatus.OK).body("Feedback added successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review cycle not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding feedback: " + e.getMessage());
        }
    }

    @GetMapping("/feedbackAndRating/{userId}")
    public ResponseEntity<ReviewCycle> getFeedbackAndRating(@PathVariable Long userId) {
        try {
            // Retrieve the review cycle by ID
            ReviewCycle reviewCycle = reviewCycleService.getFeedbackbyuserId(userId);

            if (reviewCycle != null) {
                // Assuming you have fields 'feedback' and 'rating' in ReviewCycle
                return ResponseEntity.ok(reviewCycle);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/list/{userId}")
    public ResponseEntity<List<ReviewCycleDTO>> getFeedbackAndRatingList(@PathVariable Long userId){
        try {
            List<ReviewCycle> reviewCycleList = reviewCycleRepository.findByUserId(userId);
            List<GoalPlan> goalPlanList = goalPlanRepository.findByUserId(userId);
            GoalPlan goalPlan = goalPlanList.get(goalPlanList.size()-1);
            List<ReviewCycleDTO> reviewCycleDTOS = new ArrayList<>();
            for(ReviewCycle reviewCycle: reviewCycleList){
                List<KeyResult> keyResultList = keyResultRepository.findByWindowId(reviewCycle.getWindowId());
                GoalPlan goalPlan1 = goalPlanRepository.findByGoalPlanId(keyResultList.get(0).getGoalPlanId());
                ReviewCycleDTO reviewCycleDTO = new ReviewCycleDTO();
                reviewCycleDTO.setUserId(reviewCycle.getUserId());
                reviewCycleDTO.setPeriod(reviewCycle.getPeriod());
                reviewCycleDTO.setOverallRating(reviewCycle.getOverallRating());
                reviewCycleDTO.setReviewStatus(reviewCycle.getReviewStatus());
                reviewCycleDTO.setFeedback(reviewCycle.getFeedback());
                reviewCycleDTO.setUserFeedback(reviewCycle.getUserFeedback());
                reviewCycleDTO.setFinancialYear(goalPlan1.getFinancialYear());
                reviewCycleDTOS.add(reviewCycleDTO);
            }
            if(reviewCycleDTOS != null){
                return ResponseEntity.ok(reviewCycleDTOS);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/userCounts/{managerId}")
    public ResponseEntity<UserCountsDTO> getUserCountsByManagerId(@PathVariable Long managerId) {
        try {
            // Get userIds based on the managerId
            List<User> users = userRepository.findByReportingManagerId(managerId);

            List<Long> userIds = new ArrayList<>();
            for(User user: users){
                userIds.add(user.getUserId());
            }
            // Get the count of users whose latest review cycle's review_status is completed
            int completedReviewCount = reviewCycleRepository.countUsersWithLatestReviewStatus(userIds, "Reviewed");

            // Get the count of total users under the reporting manager
            int totalUserCount = userIds.size();

            // Create a DTO (Data Transfer Object) to hold the counts
            UserCountsDTO userCountsDTO = new UserCountsDTO();
            userCountsDTO.setCompletedReviewCount(completedReviewCount);
            userCountsDTO.setTotalUserCount(totalUserCount);

            return ResponseEntity.ok(userCountsDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/secondLatestFeedbackAndRating/{userId}")
    public ResponseEntity<ReviewCycleDTO> getSecondLatestFeedbackAndRating(@PathVariable Long userId) {
        try {
            ReviewCycle secondLatestReviewCycle = reviewCycleService.getSecondLatestReviewCycleByUserId(userId);

            if (secondLatestReviewCycle != null) {
                ReviewCycleDTO reviewCycleDTO = new ReviewCycleDTO();
                reviewCycleDTO.setUserId(secondLatestReviewCycle.getUserId());
                reviewCycleDTO.setPeriod(secondLatestReviewCycle.getPeriod());
                reviewCycleDTO.setOverallRating(secondLatestReviewCycle.getOverallRating());
                reviewCycleDTO.setReviewStatus(secondLatestReviewCycle.getReviewStatus());
                reviewCycleDTO.setFeedback(secondLatestReviewCycle.getFeedback());
                reviewCycleDTO.setUserFeedback(secondLatestReviewCycle.getUserFeedback());

                return ResponseEntity.ok(reviewCycleDTO);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/averageRating/{userId}")
    public ResponseEntity<Double> getAverageRatingByUserId(@PathVariable Long userId) {
        try {
            // Retrieve all review cycles for the given user
            List<ReviewCycle> reviewCycles = reviewCycleRepository.findByUserId(userId);

            if (!reviewCycles.isEmpty()) {
                // Calculate the average rating
                double totalRating = 0.0;
                int validRatingsCount = 0;

                for (ReviewCycle reviewCycle : reviewCycles) {
                    String overallRatingStr = reviewCycle.getOverallRating();

                    // Check if overallRating is not null and is a valid double
                    if (overallRatingStr != null && overallRatingStr.matches("-?\\d+(\\.\\d+)?")) {
                        totalRating += Double.parseDouble(overallRatingStr);
                        validRatingsCount++;
                    }
                }

                if (validRatingsCount > 0) {
                    double averageRating = totalRating / validRatingsCount;

                    // Return the average rating
                    return ResponseEntity.ok(averageRating);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/listOld/{userId}")
    public ResponseEntity<List<ReviewCycle>> getFeedbackList(@PathVariable Long userId){
        try {
            List<ReviewCycle> reviewCycleList = reviewCycleRepository.findByUserId(userId);
            if(reviewCycleList != null){
                return ResponseEntity.ok(reviewCycleList);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}

