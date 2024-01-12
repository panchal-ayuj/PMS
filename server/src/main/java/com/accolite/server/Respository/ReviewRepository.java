package com.accolite.server.Respository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.accolite.server.models.Review;

public interface ReviewRepository extends JpaRepository<Review,Long> {

}
