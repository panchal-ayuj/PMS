package com.accolite.server.models.user;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        // Implement registration logic, e.g., validation, setting default values, etc.
        return userRepository.save(user);
    }

    public User updateUser(Long userId, User updatedUser) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));

        // Update user details
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        // Update other fields as needed

        return userRepository.save(existingUser);
    }

    public User getUserDetails(Long userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    public List<User> getUserHierarchy(Long userId) {
        // Implement hierarchy retrieval logic based on the requirements
        return userRepository.findByReportingManagerId(userId);
    }
}
