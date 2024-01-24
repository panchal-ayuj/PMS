package com.accolite.server.repository;

import com.accolite.server.models.ReviewCycle;
import com.accolite.server.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

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

    @Query("SELECT COUNT(rc) FROM ReviewCycle rc WHERE rc.userId IN :userIds AND rc.startDate = (SELECT MAX(subRc.startDate) FROM ReviewCycle subRc WHERE subRc.userId = rc.userId AND subRc.reviewStatus = :reviewStatus)")
    int countUsersWithLatestReviewStatus(@Param("userIds") List<Long> userIds, @Param("reviewStatus") String reviewStatus);

    List<ReviewCycle> findByUserIdOrderByStartDateDesc(Long userId);
}
