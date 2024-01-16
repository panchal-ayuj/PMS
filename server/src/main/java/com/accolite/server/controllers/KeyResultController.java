package com.accolite.server.controllers;

import com.accolite.server.models.GoalPlan;
import com.accolite.server.models.KeyResult;
import com.accolite.server.models.User;
import com.accolite.server.readers.KeyResultExcelReader;
import com.accolite.server.repository.KeyResultRepository;
import com.accolite.server.service.KeyResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/keyResult")
public class KeyResultController {

    @Autowired
    private KeyResultService keyResultService;

    @Autowired
    private KeyResultRepository keyResultRepository;

    @PostMapping("")
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            List<KeyResult> keyResults = KeyResultExcelReader.readKeyResultsFromExcel(file);
            keyResultService.saveAll(keyResults);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<KeyResult> registerKeyResult(@RequestBody KeyResult keyResult) {
        KeyResult registeredKeyResult = keyResultService.registerKeyResult(keyResult);
        return new ResponseEntity<>(registeredKeyResult, HttpStatus.CREATED);
    }

    @GetMapping("")
    public ResponseEntity<List<KeyResult>> getKeyResults() {
        List<KeyResult> keyResults = keyResultRepository.findAll();
        return new ResponseEntity<>(keyResults, HttpStatus.OK);
    }


    @GetMapping("/keyResultById/{keyResultId}")
    public ResponseEntity<KeyResult> getKeyResultById(@PathVariable Long keyResultId) {
        KeyResult keyResult = keyResultService.getKeyResultById(keyResultId);
        if (keyResult != null) {
            return ResponseEntity.ok(keyResult);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/keyResultById/{keyResultId}")
    public ResponseEntity<KeyResult> updateKeyResult(@PathVariable Long keyResultId, @RequestBody KeyResult updatedKeyResult) {
        KeyResult existingKeyResult = keyResultService.getKeyResultById(keyResultId);

        if (existingKeyResult != null) {
            // Update the existing goal plan with the values from the updatedGoalPlan
            updatedKeyResult.setKeyResultId(existingKeyResult.getKeyResultId());
            // ... (set other fields accordingly)

            KeyResult savedKeyResult = keyResultRepository.save(updatedKeyResult); // Assuming you have a method like this

            return ResponseEntity.ok(updatedKeyResult);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
