package com.accolite.server.models;

import jakarta.persistence.*;
import java.util.Date;

@Entity
public class ReviewCycle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long windowId;
    private Long userId;
    private Date startDate;
    private Date endDate;
    private String period;
    private String overallRating;
    private String reviewStatus;
    private String feedback;
    private Long reviewerId;
    private String seniorRMfeedback;
    private Long seniorRMId;
    private String superSeniorRMfeedback;
    private Long superSeniorRMId;
    private String userFeedback;

    public ReviewCycle() {
    }

    public ReviewCycle(Long windowId, Long userId, Date startDate, Date endDate, String period, String overallRating, String reviewStatus, String feedback, Long reviewerId, String seniorRMfeedback, Long seniorRMId, String superSeniorRMfeedback, Long superSeniorRMId, String userFeedback) {
        this.windowId = windowId;
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.period = period;
        this.overallRating = overallRating;
        this.reviewStatus = reviewStatus;
        this.feedback = feedback;
        this.reviewerId = reviewerId;
        this.seniorRMfeedback = seniorRMfeedback;
        this.seniorRMId = seniorRMId;
        this.superSeniorRMfeedback = superSeniorRMfeedback;
        this.superSeniorRMId = superSeniorRMId;
        this.userFeedback = userFeedback;
    }

    public Long getWindowId() {
        return windowId;
    }

    public void setWindowId(Long windowId) {
        this.windowId = windowId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
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

    public Long getReviewerId() {
        return reviewerId;
    }

    public void setReviewerId(Long reviewerId) {
        this.reviewerId = reviewerId;
    }

    public String getSeniorRMfeedback() {
        return seniorRMfeedback;
    }

    public void setSeniorRMfeedback(String seniorRMfeedback) {
        this.seniorRMfeedback = seniorRMfeedback;
    }

    public Long getSeniorRMId() {
        return seniorRMId;
    }

    public void setSeniorRMId(Long seniorRMId) {
        this.seniorRMId = seniorRMId;
    }

    public String getSuperSeniorRMfeedback() {
        return superSeniorRMfeedback;
    }

    public void setSuperSeniorRMfeedback(String superSeniorRMfeedback) {
        this.superSeniorRMfeedback = superSeniorRMfeedback;
    }

    public Long getSuperSeniorRMId() {
        return superSeniorRMId;
    }

    public void setSuperSeniorRMId(Long superSeniorRMId) {
        this.superSeniorRMId = superSeniorRMId;
    }

    public String getUserFeedback() {
        return userFeedback;
    }

    public void setUserFeedback(String userFeedback) {
        this.userFeedback = userFeedback;
    }

    @Override
    public String toString() {
        return "ReviewCycle{" +
                "windowId=" + windowId +
                ", userId=" + userId +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", period='" + period + '\'' +
                ", overallRating='" + overallRating + '\'' +
                ", reviewStatus='" + reviewStatus + '\'' +
                ", feedback='" + feedback + '\'' +
                ", reviewerId=" + reviewerId +
                ", seniorRMfeedback='" + seniorRMfeedback + '\'' +
                ", seniorRMId=" + seniorRMId +
                ", superSeniorRMfeedback='" + superSeniorRMfeedback + '\'' +
                ", superSeniorRMId=" + superSeniorRMId +
                ", userFeedback='" + userFeedback + '\'' +
                '}';
    }
}
