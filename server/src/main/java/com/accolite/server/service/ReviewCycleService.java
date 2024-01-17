package com.accolite.server.service;

import com.accolite.server.models.ReviewCycle;
import com.accolite.server.models.Task;
import com.accolite.server.models.User;
import com.accolite.server.repository.ReviewCycleRepository;
import com.accolite.server.writers.ReviewCycleWriter;
import com.accolite.server.writers.UserExcelWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

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
    public void saveAll(List<ReviewCycle> reviewCycles) {
        reviewCycleRepository.saveAll(reviewCycles);
    }
}
