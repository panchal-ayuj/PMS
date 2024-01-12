package com.accolite.server.service;

import com.accolite.server.models.KeyResult;
import com.accolite.server.repository.KeyResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KeyResultService {

    @Autowired
    private KeyResultRepository keyResultRepository;

    public void saveAll(List<KeyResult> keyResults) {
        keyResultRepository.saveAll(keyResults);
    }
}
