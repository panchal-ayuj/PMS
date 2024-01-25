package com.accolite.server.models;

public class UserCountsDTO {
    private int completedReviewCount;
    private int totalUserCount;

    public UserCountsDTO() {
    }
// Getters and setters

    public UserCountsDTO(int completedReviewCount, int totalUserCount) {
        this.completedReviewCount = completedReviewCount;
        this.totalUserCount = totalUserCount;
    }

    public int getCompletedReviewCount() {
        return completedReviewCount;
    }

    public void setCompletedReviewCount(int completedReviewCount) {
        this.completedReviewCount = completedReviewCount;
    }

    public int getTotalUserCount() {
        return totalUserCount;
    }

    public void setTotalUserCount(int totalUserCount) {
        this.totalUserCount = totalUserCount;
    }

    @Override
    public String toString() {
        return "UserCountsDTO{" +
                "completedReviewCount=" + completedReviewCount +
                ", totalUserCount=" + totalUserCount +
                '}';
    }
}
