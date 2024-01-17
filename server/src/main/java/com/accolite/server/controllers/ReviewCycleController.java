package com.accolite.server.controllers;

import com.accolite.server.models.ReviewCycle;
import com.accolite.server.models.User;
import com.accolite.server.readers.ReviewCycleExcelReader;
import com.accolite.server.repository.ReviewCycleRepository;
import com.accolite.server.service.ReviewCycleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
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
    @GetMapping("/export")
    public ResponseEntity<Object> exportReviewCyclesToExcel() {
        List<ReviewCycle> reviewCycles = reviewCycleService.getAllReviewCycles();
        String filePath = "review_cycle_data_export.xlsx";

        try {
            reviewCycleService.generateReviewCycleExcelFile(reviewCycles,filePath);

            // Read the file content
            byte[] fileContent = Files.readAllBytes(Paths.get(filePath));

            // Create a ByteArrayResource from the file content
            ByteArrayResource resource = new ByteArrayResource(fileContent);

            // Set the Content-Disposition header to prompt the user for download
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=review_cycle_data_export.xlsx");

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

    @GetMapping("")
    public ResponseEntity<List<ReviewCycle>> getKeyResults() {
        List<ReviewCycle> reviewCycles = reviewCycleRepository.findAll();
        return new ResponseEntity<>(reviewCycles, HttpStatus.OK);
    }
}

