package com.accolite.server.models;

import java.util.Date;
import java.util.List;

public class TaskDTO {
    private String keyResultName;
    private String description;
    private Date creationDate;
    private Date deadline;
    private int weight;
    private String completionStatus;
    private int userId;
    private int windowId;
    private int rating;
    private String feedback;
    private String period;
    private List<String> taskAttributes;

    // Constructors, getters, and setters
    // ...

    public TaskDTO() {
    }

    public TaskDTO(Long taskId, String keyResultName, String description, Date creationDate, Date deadline, int weight,
                   String completionStatus, int userId, int windowId, int rating, String feedback, String period,
                   List<String> taskAttributes) {
        this.keyResultName = keyResultName;
        this.description = description;
        this.creationDate = creationDate;
        this.deadline = deadline;
        this.weight = weight;
        this.completionStatus = completionStatus;
        this.userId = userId;
        this.windowId = windowId;
        this.rating = rating;
        this.feedback = feedback;
        this.period = period;
        this.taskAttributes = taskAttributes;
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

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getCompletionStatus() {
        return completionStatus;
    }

    public void setCompletionStatus(String completionStatus) {
        this.completionStatus = completionStatus;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getWindowId() {
        return windowId;
    }

    public void setWindowId(int windowId) {
        this.windowId = windowId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public String getPeriod() {
        return period;
    }

    public void setPeriod(String period) {
        this.period = period;
    }

    public List<String> getTaskAttributes() {
        return taskAttributes;
    }

    public void setTaskAttributes(List<String> taskAttributes) {
        this.taskAttributes = taskAttributes;
    }
// Other methods if needed
    // ...
}
