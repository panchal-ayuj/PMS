package com.accolite.server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;


@Entity
public class GoalPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalPlanId;
    private Long userId;
    private Integer financialYear;

    private String goalPlanName;

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

    public Integer getFinancialYear() {
        return financialYear;
    }

    public void setFinancialYear(Integer financialYear) {
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
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("goalPlanId", goalPlanId);
        map.put("userId", userId);
        map.put("financialYear", financialYear);
        return map;
    }
}
