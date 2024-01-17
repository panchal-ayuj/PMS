package com.accolite.server.models;


import jakarta.persistence.*;

import java.util.HashMap;
import java.util.Map;

@Entity
public class KeyResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long keyResultId;
    private Long userId;
    private Long goalPlanId; // Foreign key referencing GoalPlan
    private String keyResultName;
    private String description;
    private Integer weight;
    private String period;
    private Integer windowId;
    private Integer rating;

    public KeyResult() {
    }

    public KeyResult(Long keyResultId, Long userId, Long goalPlanId, String keyResultName, String description, int weight, String period, int windowId, int rating) {
        this.keyResultId = keyResultId;
        this.userId = userId;
        this.goalPlanId = goalPlanId;
        this.keyResultName = keyResultName;
        this.description = description;
        this.weight = weight;
        this.period = period;
        this.windowId = windowId;
        this.rating = rating;
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

    public Integer getWeight() {
        return weight;
    }

    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public Integer getWindowId() {
        return windowId;
    }

    public void setWindowId(Integer windowId) {
        this.windowId = windowId;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
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
                ", windowId=" + windowId +
                ", rating=" + rating +
                '}';
    }
    public Map<String, Object> toMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("keyResultId", keyResultId);
        map.put("userId", userId);
        map.put("goalPlanId", goalPlanId);
        map.put("keyResultName", keyResultName);
        map.put("description", description);
        map.put("weight", weight);
        map.put("period", period);
        map.put("windowId", windowId);
        map.put("rating", rating);
        return map;
    }
}
