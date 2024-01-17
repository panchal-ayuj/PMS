package com.accolite.server.service;

import com.accolite.server.models.GoalPlan;
import com.accolite.server.models.KeyResult;
import com.accolite.server.repository.KeyResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KeyResultService {

    @Autowired
    private KeyResultRepository keyResultRepository;
    public KeyResult registerKeyResult(KeyResult keyResult) {
        // Implement registration logic, e.g., validation, setting default values, etc.
        return keyResultRepository.save(keyResult);
    }
    public void saveAll(List<KeyResult> keyResults) {
        keyResultRepository.saveAll(keyResults);
    }

    public KeyResult getKeyResultById(Long keyResultId) {
        return keyResultRepository.findByKeyResultId(keyResultId);
    }
}
