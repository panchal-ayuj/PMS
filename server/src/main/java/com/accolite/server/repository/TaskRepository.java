package com.accolite.server.repository;

import com.accolite.server.models.Task;
import com.accolite.server.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // You can add custom query methods if needed
    Task findByTaskId(Long taskId);

}