package com.accolite.server.models;

import java.util.Date;

public class ReviewCycleDTO {
    private Long userId;
    private String period;
    private String overallRating;
    private String reviewStatus;
    private String feedback;
    private String userFeedback;
    private Integer financialYear;

    public ReviewCycleDTO() {
    }

    public ReviewCycleDTO(Long userId, String period, String overallRating, String reviewStatus, String feedback, String userFeedback, Integer financialYear) {
        this.userId = userId;
        this.period = period;
        this.overallRating = overallRating;
        this.reviewStatus = reviewStatus;
        this.feedback = feedback;
        this.userFeedback = userFeedback;
        this.financialYear = financialYear;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public String getOverallRating() {
        return overallRating;
    }

    public void setOverallRating(String overallRating) {
        this.overallRating = overallRating;
    }

    public String getReviewStatus() {
        return reviewStatus;
    }

    public void setReviewStatus(String reviewStatus) {
        this.reviewStatus = reviewStatus;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getUserFeedback() {
        return userFeedback;
    }

    public void setUserFeedback(String userFeedback) {
        this.userFeedback = userFeedback;
    }

    public Integer getFinancialYear() {
        return financialYear;
    }

    public void setFinancialYear(Integer financialYear) {
        this.financialYear = financialYear;
    }

    @Override
    public String toString() {
        return "ReviewCycleDTO{" +
                "userId=" + userId +
                ", period='" + period + '\'' +
                ", overallRating='" + overallRating + '\'' +
                ", reviewStatus='" + reviewStatus + '\'' +
                ", feedback='" + feedback + '\'' +
                ", userFeedback='" + userFeedback + '\'' +
                ", financialYear=" + financialYear +
                '}';
    }
}
