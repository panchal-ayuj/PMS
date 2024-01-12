package com.accolite.server.models;

import jakarta.persistence.*;


@Entity
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Long reviewId;

    @Column(name = "rating")
    private int rating;

    public Long getReviewId() {
        return reviewId;
    }

    public void setReviewId(Long reviewId) {
        this.reviewId = reviewId;
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



    @Column(name = "feedback")
    private String feedback;




    @Column(name = "period")
    private String period;

   /* @ManyToOne
    @JoinColumn(name = "window_id", nullable = false)
    private ReviewCycle reviewCycle;*/



    public Review() {
    }

    public Review(Long reviewId, int rating, String feedback, String period) {
        this.reviewId = reviewId;
        this.rating = rating;
        this.feedback = feedback;
      //  this.task = task;
        //this.user = user;
        this.period = period;
        //this.reviewCycle = reviewCycle;
    }
}
