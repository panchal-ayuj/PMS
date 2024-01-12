package com.accolite.server.taskRepository;

import com.accolite.server.taskModel.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

}
