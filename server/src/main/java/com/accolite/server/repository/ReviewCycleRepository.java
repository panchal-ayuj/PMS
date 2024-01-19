package com.accolite.server.repository;

import com.accolite.server.models.ReviewCycle;
import com.accolite.server.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewCycleRepository extends JpaRepository<ReviewCycle, Long> {
    ReviewCycle findByWindowId(Long windowId);
    ReviewCycle findByuserId(Long userId);
}
