package com.accolite.server.service;

import com.accolite.server.models.ReviewCycle;
import com.accolite.server.repository.ReviewCycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewCycleService {

    @Autowired
    private ReviewCycleRepository reviewCycleRepository;

    public void saveAll(List<ReviewCycle> reviewCycles) {
        reviewCycleRepository.saveAll(reviewCycles);
    }
}
