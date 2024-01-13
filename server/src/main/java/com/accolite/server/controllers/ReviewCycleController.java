package com.accolite.server.controllers;

import com.accolite.server.models.KeyResult;
import com.accolite.server.models.ReviewCycle;
import com.accolite.server.readers.ReviewCycleExcelReader;
import com.accolite.server.repository.ReviewCycleRepository;
import com.accolite.server.service.ReviewCycleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/reviewCycle")
public class ReviewCycleController {

    @Autowired
    private ReviewCycleService reviewCycleService;

    @Autowired
    private ReviewCycleRepository reviewCycleRepository;

    @PostMapping("")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            List<ReviewCycle> reviewCycles = ReviewCycleExcelReader.readReviewCyclesFromExcel(file);
            reviewCycleService.saveAll(reviewCycles);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<ReviewCycle> registerReviewCycle(@RequestBody ReviewCycle reviewCycle) {
        ReviewCycle registeredReviewCycle = reviewCycleService.registerReviewCycle(reviewCycle);
        return new ResponseEntity<>(registeredReviewCycle, HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<List<ReviewCycle>> getKeyResults() {
        List<ReviewCycle> reviewCycles = reviewCycleRepository.findAll();
        return new ResponseEntity<>(reviewCycles, HttpStatus.OK);
    }
}

