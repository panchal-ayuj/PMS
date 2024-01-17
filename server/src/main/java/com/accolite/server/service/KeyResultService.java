package com.accolite.server.service;

import com.accolite.server.models.KeyResult;
import com.accolite.server.models.ReviewCycle;
import com.accolite.server.repository.KeyResultRepository;
import com.accolite.server.writers.KeyResultExcelWriter;
import com.accolite.server.writers.ReviewCycleWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class KeyResultService {

    @Autowired
    private KeyResultRepository keyResultRepository;

    private KeyResultExcelWriter keyResultExcelWriter;

    @Autowired
    public KeyResultService( KeyResultExcelWriter keyResultExcelWriter) {

        this.keyResultExcelWriter = keyResultExcelWriter;
    }
    public void generateKeyResultExcelFile(List<KeyResult> keyResults, String filePath) {

        try {
            keyResultExcelWriter = new KeyResultExcelWriter();  // Reset the UserExcelWriter before each export

            for (KeyResult keyResult : keyResults ) {
                keyResultExcelWriter.addKeyResult(keyResult);
            }

            keyResultExcelWriter.writeToFile(filePath);
        } catch (IOException e) {
            // Handle or log the exception appropriately
            e.printStackTrace();
        }
    }


    public KeyResult registerKeyResult(KeyResult keyResult) {
        // Implement registration logic, e.g., validation, setting default values, etc.
        return keyResultRepository.save(keyResult);
    }
    public List<KeyResult> getAllKeyResults() {
        return keyResultRepository.findAll();
    }

    public void saveAll(List<KeyResult> keyResults) {
        keyResultRepository.saveAll(keyResults);
    }
}
