package com.accolite.server.service;

import com.accolite.server.models.Task;
import com.accolite.server.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long taskId) {
        return taskRepository.findByTaskId(taskId);
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long taskId, Task updatedTask) {
        if (taskRepository.existsById(taskId)) {
            updatedTask.setTaskId(taskId);
            return taskRepository.save(updatedTask);
        }
        return null; // or throw an exception based on your requirement
    }

    public void saveAll(List<Task> tasks) {
        taskRepository.saveAll(tasks);
    }

    public List<Task> getTasksByKeyResultId(Long keyResultId) {
        // Implement the logic to retrieve tasks based on keyResultId
        // You can use taskRepository.findByKeyResultId(keyResultId) or any other method
        return taskRepository.findByKeyResultId(keyResultId);
    }

}