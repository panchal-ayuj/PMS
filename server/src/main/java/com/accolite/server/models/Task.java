package com.accolite.server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import jakarta.persistence.*;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@Table(name = "Task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;
    private int keyResultId;
    private String description;
    @Temporal(TemporalType.TIMESTAMP)
    private Date creationDate;
    @Temporal(TemporalType.TIMESTAMP)
    private Date deadline;
    private int weight;
    private String completionStatus;
    private int userId;
    //    @ManyToOne
//    @JoinColumn(name = "windowId")
    private int windowId;
    private int rating;
    private String feedback;
    private String period;
    @ElementCollection
    @CollectionTable(name = "TaskAttribute", joinColumns = @JoinColumn(name = "taskId"))
    @Column(name = "taskAttributeName")
    private List<String> taskAttributes;

    public Task() {
    }

    public Task(Long taskId, int keyResultId, String description, Date creationDate, Date deadline, int weight, String completionStatus, int userId, int windowId, int rating, String feedback, String period, List<String> taskAttributes) {
        this.taskId = taskId;
        this.keyResultId = keyResultId;
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

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public int getKeyResultId() {
        return keyResultId;
    }

    public void setKeyResultId(int keyResultId) {
        this.keyResultId = keyResultId;
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

    @Override
    public String toString() {
        return "Task{" +
                "taskId=" + taskId +
                ", keyResultArea=" + keyResultId +
                ", description='" + description + '\'' +
                ", creationDate=" + creationDate +
                ", deadline=" + deadline +
                ", weight=" + weight +
                ", completionStatus='" + completionStatus + '\'' +
                ", userId=" + userId +
                ", reviewCycleId=" + windowId +
                ", rating=" + rating +
                ", feedback='" + feedback + '\'' +
                ", period='" + period + '\'' +
                ", taskAttributes=" + taskAttributes +
                '}';
    }
    public Map<String, Object> toMap() {
        Map<String, Object> taskMap = new HashMap<>();
        taskMap.put("taskId", taskId);
        taskMap.put("keyResultId", keyResultId);
        taskMap.put("description", description);
        taskMap.put("creationDate", creationDate);
        taskMap.put("deadline", deadline);
        taskMap.put("weight", weight);
        taskMap.put("completionStatus", completionStatus);
        taskMap.put("userId", userId);
        taskMap.put("windowId", windowId);
        taskMap.put("rating", rating);
        taskMap.put("feedback", feedback);
        taskMap.put("period", period);
        taskMap.put("taskAttributes", taskAttributes);

        return taskMap;
    }


}