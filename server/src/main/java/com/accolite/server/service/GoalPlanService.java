package com.accolite.server.service;

import com.accolite.server.models.GoalPlan;
import com.accolite.server.repository.GoalPlanRepository;
import com.accolite.server.writers.GoalPlanExcelWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class GoalPlanService {

    @Autowired
    private GoalPlanRepository goalPlanRepository;

    private GoalPlanExcelWriter goalPlanExcelWriter;

    @Autowired
    public GoalPlanService(GoalPlanExcelWriter goalPlanExcelWriter) {
        this.goalPlanExcelWriter = goalPlanExcelWriter;
    }
    public List<GoalPlan> getAllGoalPlans() {
        return goalPlanRepository.findAll();
    }

    public GoalPlan registerGoalPlan(GoalPlan goalPlan) {
        // Implement registration logic, e.g., validation, setting default values, etc.
        return goalPlanRepository.save(goalPlan);
    }

    public void generateGoalPlanExcelFile(List<GoalPlan> goalPlans, String filePath) {
        try {
            goalPlanExcelWriter = new GoalPlanExcelWriter();  // Reset the GoalPlanExcelWriter before each export

            for (GoalPlan goalPlan : goalPlans) {
                goalPlanExcelWriter.addGoalPlan(goalPlan);
            }

            goalPlanExcelWriter.writeToFile(filePath);
        } catch (IOException e) {
            // Handle or log the exception appropriately
            e.printStackTrace();
        }
    }

    public void saveAll(List<GoalPlan> goalPlans) {
        goalPlanRepository.saveAll(goalPlans);
    }

    public List<GoalPlan> getGoalPlansByUserId(Long userId) {
        return goalPlanRepository.findByUserId(userId);
    }

    public GoalPlan getGoalPlanById(Long goalPlanId) {
        return goalPlanRepository.findByGoalPlanId(goalPlanId);
    }
}
