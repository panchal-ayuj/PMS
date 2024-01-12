package com.accolite.server.Service;

import com.accolite.server.Exceptions.ReviewNotFoundException;
import com.accolite.server.Respository.ReviewRepository;
import com.accolite.server.models.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    public Review createReview(Review review) {
        // Implement logic to save the review to the database
        return reviewRepository.save((Review) review);
    }

    public Review getReviewById(Long reviewId) {
        // Implement logic to retrieve a review by its ID from the database
        return reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ReviewNotFoundException("Review not found with ID: " + reviewId));
    }

    public Review updateReview(Long reviewId, Review updatedReview) {
        // Implement logic to update an existing review in the database
        if (!reviewRepository.existsById(reviewId)) {
            throw new ReviewNotFoundException("Review not found with ID: " + reviewId);
        }

        updatedReview.setReviewId(reviewId); // Set the ID for the updated review
        return reviewRepository.save(updatedReview);
    }
}
