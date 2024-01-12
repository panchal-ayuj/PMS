package com.accolite.server.controllers;

import com.accolite.server.models.KeyResult;
import com.accolite.server.readers.KeyResultExcelReader;
import com.accolite.server.service.KeyResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
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
}
