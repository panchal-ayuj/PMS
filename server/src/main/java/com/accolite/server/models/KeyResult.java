package com.accolite.server.models;


import jakarta.persistence.*;

@Entity
public class KeyResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long keyResultId;
    private Long userId;
    private Long goalPlanId; // Foreign key referencing GoalPlan
    private String keyResultName;
    private String description;
    private int weight;
    private String period;

    public KeyResult() {
    }

    public KeyResult(Long keyResultId, Long userId, Long goalPlanId, String keyResultName, String description, int weight, String period) {
        this.keyResultId = keyResultId;
        this.userId = userId;
        this.goalPlanId = goalPlanId;
        this.keyResultName = keyResultName;
        this.description = description;
        this.weight = weight;
        this.period = period;
    }

    public Long getKeyResultId() {
        return keyResultId;
    }

    public void setKeyResultId(Long keyResultId) {
        this.keyResultId = keyResultId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getGoalPlanId() {
        return goalPlanId;
    }

    public void setGoalPlanId(Long goalPlanId) {
        this.goalPlanId = goalPlanId;
    }

    public String getKeyResultName() {
        return keyResultName;
    }

    public void setKeyResultName(String keyResultName) {
        this.keyResultName = keyResultName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    @Override
    public String toString() {
        return "KeyResult{" +
                "keyResultId=" + keyResultId +
                ", userId=" + userId +
                ", goalPlanId=" + goalPlanId +
                ", keyResultName='" + keyResultName + '\'' +
                ", description='" + description + '\'' +
                ", weight=" + weight +
                ", period='" + period + '\'' +
                '}';
    }
}
