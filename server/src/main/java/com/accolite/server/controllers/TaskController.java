package com.accolite.server.controllers;

import com.accolite.server.models.Task;
import com.accolite.server.models.User;
import com.accolite.server.readers.TaskExcelReader;
import com.accolite.server.repository.TaskRepository;
import com.accolite.server.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @Autowired
    TaskRepository taskRepository;

    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            List<Task> tasks = TaskExcelReader.readUsersFromExcel(file);
            taskService.saveAll(tasks);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> tasks = taskService.getAllTasks();
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        Task createdTask = taskService.createTask(task);
        return new ResponseEntity<>(createdTask, HttpStatus.CREATED);
    }
    @GetMapping("/export")
    public ResponseEntity<?> exportTasksToExcel() {
        List<Task> tasks = taskService.getAllTasks();
        String filePath = "task_data_export.xlsx";

        try {
            taskService.exportTasksToExcel(tasks,filePath);

            // Read the file content
            byte[] fileContent = Files.readAllBytes(Paths.get(filePath));

            // Create a ByteArrayResource from the file content
            ByteArrayResource resource = new ByteArrayResource(fileContent);

            // Set the Content-Disposition header to prompt the user for download
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=task_data_export.xlsx");

            // Return the ResponseEntity with the ByteArrayResource and headers
            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(fileContent.length)
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(resource);
        } catch (IOException e) {
            e.printStackTrace();
            // Handle the exception and return an error response if needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @GetMapping("/taskById/{taskId}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long taskId) {
        Task task = taskService.getTaskById(taskId);
        if (task != null) {
            return ResponseEntity.ok(task);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/taskById/{taskId}")
    public ResponseEntity<Task> updateTask(@PathVariable Long taskId, @RequestBody Task updatedTask) {
        Task existingTask = taskService.getTaskById(taskId);

        if (existingTask != null) {
            // Update the existing goal plan with the values from the updatedGoalPlan
            updatedTask.setTaskId(existingTask.getTaskId());
            // ... (set other fields accordingly)

            Task savedTask = taskRepository.save(updatedTask); // Assuming you have a method like this

            return ResponseEntity.ok(updatedTask);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/byKeyResultId/{keyResultId}")
    public ResponseEntity<List<Task>> getTasksByKeyResultId(@PathVariable Long keyResultId) {
        List<Task> tasks = taskService.getTasksByKeyResultId(keyResultId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }
    // You can add other methods as needed
}
