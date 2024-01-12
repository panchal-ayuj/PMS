package com.accolite.server.repository;

import com.accolite.server.models.KeyResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface KeyResultRepository extends JpaRepository<KeyResult, Long> {
    List<KeyResult> findByUserId(Long userId);
}

