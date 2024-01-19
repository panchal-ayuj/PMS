package com.accolite.server.controllers;

import com.accolite.server.models.KeyResult;
import com.accolite.server.models.ReviewCycle;
import com.accolite.server.models.Task;
import com.accolite.server.readers.ReviewCycleExcelReader;
import com.accolite.server.repository.ReviewCycleRepository;
import com.accolite.server.service.ReviewCycleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/reviewCycle")
public class ReviewCycleController {

    @Autowired
    private ReviewCycleService reviewCycleService;

    @Autowired
    private ReviewCycleRepository reviewCycleRepository;

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

    @PostMapping("/register")
    public ResponseEntity<ReviewCycle> registerReviewCycle(@RequestBody ReviewCycle reviewCycle) {
        ReviewCycle registeredReviewCycle = reviewCycleService.registerReviewCycle(reviewCycle);
        return new ResponseEntity<>(registeredReviewCycle, HttpStatus.CREATED);
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

    @PostMapping("/addFeedback/{reviewCycleId}")
    public ResponseEntity<String> addFeedbackToReviewCycle(@PathVariable Long reviewCycleId, @RequestBody String feedback) {
        try {
            // Retrieve the review cycle by ID
            ReviewCycle reviewCycle = reviewCycleService.getReviewCycleById(reviewCycleId);

            if (reviewCycle != null) {
                // Add the feedback to the review cycle
                reviewCycle.setFeedback(feedback);

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







}

