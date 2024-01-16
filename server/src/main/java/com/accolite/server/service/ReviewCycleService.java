package com.accolite.server.service;

import com.accolite.server.models.KeyResult;
import com.accolite.server.models.ReviewCycle;
import com.accolite.server.models.Task;
import com.accolite.server.repository.ReviewCycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewCycleService {

    @Autowired
    private ReviewCycleRepository reviewCycleRepository;
    public ReviewCycle registerReviewCycle(ReviewCycle reviewCycle) {
        // Implement registration logic, e.g., validation, setting default values, etc.
        return reviewCycleRepository.save(reviewCycle);
    }

    public ReviewCycle getReviewCycleById(Long reviewCycleId) {
        return reviewCycleRepository.findByWindowId(reviewCycleId);
    }

    public void saveAll(List<ReviewCycle> reviewCycles) {
        reviewCycleRepository.saveAll(reviewCycles);
    }
}
