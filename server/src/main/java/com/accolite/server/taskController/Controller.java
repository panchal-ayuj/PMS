package com.accolite.server.taskController;

import com.accolite.server.taskModel.Task;
import com.accolite.server.taskRepository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class Controller {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskRepository.save(task);
        return ResponseEntity.ok(createdTask);
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Task> getTaskDetails(@PathVariable Long taskId) {
        return taskRepository.findById(taskId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task updatedTask) {
        return taskRepository.findById(taskId)
                .map(existingTask -> {
                    existingTask.setDescription(updatedTask.getDescription());
                    existingTask.setCreationDate(updatedTask.getCreationDate());
                    existingTask.setDeadline(updatedTask.getDeadline());
                    existingTask.setWeight(updatedTask.getWeight());
                    existingTask.setCompletionStatus(updatedTask.getCompletionStatus());
                    existingTask.setTaskAttributes(updatedTask.getTaskAttributes());
                    existingTask.setKeyResult(updatedTask.getKeyResult());
                    existingTask.setAssignedTo(updatedTask.getAssignedTo());

                    Task savedTask = taskRepository.save(existingTask);
                    return ResponseEntity.ok(savedTask);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

