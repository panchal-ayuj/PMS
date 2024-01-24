package com.accolite.server.service;

import com.accolite.server.models.ReviewCycle;
import com.accolite.server.models.Task;
import com.accolite.server.models.User;
import com.accolite.server.repository.ReviewCycleRepository;
import com.accolite.server.writers.ReviewCycleWriter;
import com.accolite.server.writers.UserExcelWriter;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewCycleService {

    @Autowired
    private ReviewCycleRepository reviewCycleRepository;
    private ReviewCycleWriter reviewCycleWriter;
    @Autowired
    public ReviewCycleService(ReviewCycleWriter reviewCycleWriter) {
        this.reviewCycleWriter = reviewCycleWriter;
    }
    public ReviewCycle registerReviewCycle(ReviewCycle reviewCycle) {
        // Implement registration logic, e.g., validation, setting default values, etc.
        return reviewCycleRepository.save(reviewCycle);
    }
    public void generateReviewCycleExcelFile(List<ReviewCycle> reviewCycles, String filePath) {

        try {
            reviewCycleWriter = new ReviewCycleWriter();  // Reset the UserExcelWriter before each export

            for (ReviewCycle reviewCycle : reviewCycles ) {
                reviewCycleWriter.addReviewCycle(reviewCycle);
            }

            reviewCycleWriter.writeToFile(filePath);
        } catch (IOException e) {
            // Handle or log the exception appropriately
            e.printStackTrace();
        }
    }
    public List<ReviewCycle> getAllReviewCycles() {
        return reviewCycleRepository.findAll();
    }

    public ReviewCycle getReviewCycleById(Long reviewCycleId) {
        return reviewCycleRepository.findByWindowId(reviewCycleId);
    }
    public ReviewCycle getFeedbackbyuserId(Long userId)
    {
        return reviewCycleRepository.findByuserId(userId);
    }

    public void saveAll(List<ReviewCycle> reviewCycles) {
        reviewCycleRepository.saveAll(reviewCycles);
    }

    public String getUserFeedbackForMostRecentCycle(Long userId) {
        try {
            Optional<ReviewCycle> mostRecentCycle = reviewCycleRepository.findTopByUserIdOrderByStartDateDesc(userId);

            return mostRecentCycle.map(ReviewCycle::getUserFeedback).orElse("No feedback available");
        } catch (Exception e) {
            // Handle errors appropriately
            throw e;
        }
    }
    public void updateUserFeedbackForMostRecentCycle(Long userId, String userFeedback) {
        try {
            Optional<ReviewCycle> mostRecentCycle = reviewCycleRepository.findTopByUserIdOrderByStartDateDesc(userId);

            mostRecentCycle.ifPresent(reviewCycle -> {
                reviewCycle.setUserFeedback(userFeedback);
                reviewCycleRepository.save(reviewCycle);
            });
        } catch (Exception e) {
            // Handle errors appropriately
            throw e;
        }
    }

    public ReviewCycle getSecondLatestReviewCycleByUserId(Long userId) {
        // Find all review cycles for the given userId, ordered by start date in descending order
        List<ReviewCycle> userReviewCycles = reviewCycleRepository.findByUserIdOrderByStartDateDesc(userId);

        // Check if there are at least two review cycles
        if (userReviewCycles.size() >= 2) {
            // Return the second review cycle
            return userReviewCycles.get(1);
        } else {
            // Return null if there are not enough review cycles
            return null;
        }
    }
}
