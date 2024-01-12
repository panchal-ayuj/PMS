package com.accolite.server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class GoalPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalPlanId;
    private Long userId;
    private int financialYear;

    public GoalPlan() {
    }

    public GoalPlan(Long goalPlanId, Long userId, int financialYear) {
        this.goalPlanId = goalPlanId;
        this.userId = userId;
        this.financialYear = financialYear;
    }

    public Long getGoalPlanId() {
        return goalPlanId;
    }

    public void setGoalPlanId(Long goalPlanId) {
        this.goalPlanId = goalPlanId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public int getFinancialYear() {
        return financialYear;
    }

    public void setFinancialYear(int financialYear) {
        this.financialYear = financialYear;
    }

    @Override
    public String toString() {
        return "GoalPlan{" +
                "goalPlanId=" + goalPlanId +
                ", userId=" + userId +
                ", financialYear=" + financialYear +
                '}';
    }
}
