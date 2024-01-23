package com.accolite.server.repository;

import com.accolite.server.models.ReviewCycle;
import com.accolite.server.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface ReviewCycleRepository extends JpaRepository<ReviewCycle, Long> {
    ReviewCycle findByWindowId(Long windowId);

    List<ReviewCycle> findByReviewStatusAndEndDateGreaterThan(String reviewStatus, Date currentDate);
    Optional<ReviewCycle> findTopByUserIdOrderByStartDateDesc(Long userId);

  
    ReviewCycle findByuserId(Long userId);

    List<ReviewCycle> findByUserId(Long userId);
}
