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
    private Integer financialYear; // Foreign key referencing GoalPlan
    private String keyResultName;
    private String description;
    private Integer weight;
    private String period;
    private Long windowId;
    private Double rating;

    public KeyResult() {
    }

    public KeyResult(Long keyResultId, Long userId, Integer financialYear, String keyResultName, String description, int weight, String period, Long windowId, Double rating) {
        this.keyResultId = keyResultId;
        this.userId = userId;
        this.financialYear = financialYear;
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

    public Integer getFinancialYear() {
        return financialYear;
    }

    public void setFinancialYear(Integer financialYear) {
        this.financialYear = financialYear;
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

    public Long getWindowId() {
        return windowId;
    }

    public void setWindowId(Long windowId) {
        this.windowId = windowId;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "KeyResult{" +
                "keyResultId=" + keyResultId +
                ", userId=" + userId +
                ", financialYear=" + financialYear +
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
        map.put("financialYear", financialYear);
        map.put("keyResultName", keyResultName);
        map.put("description", description);
        map.put("weight", weight);
        map.put("period", period);
        map.put("windowId", windowId);
        map.put("rating", rating);
        return map;
    }
}
