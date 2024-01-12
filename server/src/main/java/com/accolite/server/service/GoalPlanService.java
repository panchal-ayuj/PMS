package com.accolite.server.service;

import com.accolite.server.models.GoalPlan;
import com.accolite.server.repository.GoalPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class GoalPlanService {

    @Autowired
    private GoalPlanRepository goalPlanRepository;

    public void saveAll(List<GoalPlan> goalPlans) {
        goalPlanRepository.saveAll(goalPlans);
    }

    public List<GoalPlan> getGoalPlansByUserId(Long userId) {
        return goalPlanRepository.findByUserId(userId);
    }
}
