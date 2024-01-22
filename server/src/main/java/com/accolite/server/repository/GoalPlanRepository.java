package com.accolite.server.repository;

import com.accolite.server.models.GoalPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GoalPlanRepository extends JpaRepository<GoalPlan, Long> {

    GoalPlan findByGoalPlanId(Long goalPlanId);

    GoalPlan findByGoalPlanName(String goalPlanName);

    List<GoalPlan> findByUserId(Long userId);
}
