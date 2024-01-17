package com.accolite.server.controllers;

import com.accolite.server.models.KeyResult;
import com.accolite.server.models.ReviewCycle;
import com.accolite.server.readers.KeyResultExcelReader;
import com.accolite.server.repository.KeyResultRepository;
import com.accolite.server.service.KeyResultService;
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

    @GetMapping("/export")
    public ResponseEntity<Object> exportReviewCyclesToExcel() {
        List<KeyResult> keyResults = keyResultService.getAllKeyResults();
        String filePath = "key_result_data_export.xlsx";

        try {
            keyResultService.generateKeyResultExcelFile(keyResults,filePath);

            // Read the file content
            byte[] fileContent = Files.readAllBytes(Paths.get(filePath));

            // Create a ByteArrayResource from the file content
            ByteArrayResource resource = new ByteArrayResource(fileContent);

            // Set the Content-Disposition header to prompt the user for download
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=key_result_data_export.xlsx");

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
}
