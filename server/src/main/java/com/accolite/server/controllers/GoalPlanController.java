package com.accolite.server.controllers;

import com.accolite.server.readers.GoalPlanExcelReader;
import com.accolite.server.models.GoalPlan;
import com.accolite.server.service.GoalPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.List;

@Controller
public class GoalPlanController {

    @Autowired
    private GoalPlanService goalPlanService;

    @PostMapping("/goalPlan")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            List<GoalPlan> goalPlans = GoalPlanExcelReader.readGoalPlansFromExcel(file);
            goalPlanService.saveAll(goalPlans);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @GetMapping("/goalPlan/{userId}")
    public ResponseEntity<List<GoalPlan>> getGoalPlansByUserId(@PathVariable Long userId) {
        List<GoalPlan> goalPlans = goalPlanService.getGoalPlansByUserId(userId);
        return ResponseEntity.ok(goalPlans);
    }
}
