package com.accolite.server.service;

import com.accolite.server.models.GoalPlan;
import com.accolite.server.models.User;
import com.accolite.server.repository.UserRepository;
import com.accolite.server.writers.UserExcelWriter;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private UserExcelWriter userExcelWriter;
    @Autowired
    public UserService(UserExcelWriter userExcelWriter) {
        this.userExcelWriter = userExcelWriter;
    }

    public void generateEmployeeExcelFile(List<User> employees, String filePath) {

        try {
            userExcelWriter = new UserExcelWriter();  // Reset the UserExcelWriter before each export

            for (User employee : employees) {
                userExcelWriter.addUser(employee);
            }

            userExcelWriter.writeToFile(filePath);
        } catch (IOException e) {
            // Handle or log the exception appropriately
            e.printStackTrace();
        }
    }

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
        return userRepository.findByUserId(userId);
    }

    public List<User> getUserHierarchy(Long userId) {
        // Implement hierarchy retrieval logic based on the requirements
        return userRepository.findByReportingManagerId(userId);
    }

    public void saveAll(List<User> users) {
        userRepository.saveAll(users);
    }

    public User getUserById(Long userId) {
        return userRepository.findByUserId(userId);
    }

    public List<User> getUsersByReportingManagerId(Long reportingManagerId) {
        return userRepository.findByReportingManagerId(reportingManagerId);
    }

    public User getUserByName(String name) {
        return userRepository.findByFirstName(name);
    }

    public List<User> getUsersByPartialName(String partialName) {
        List<User> allUsers = userRepository.findAll();

        // Filter users whose first names contain the provided partialName
        List<User> matchedUsers = allUsers.stream()
                .filter(user -> user.getFirstName().toLowerCase().contains(partialName.toLowerCase()))
                .limit(4)  // Limit the results to 4 users
                .collect(Collectors.toList());

        return matchedUsers;
    }
    public String getUserFullName(Long userId){
        User user = userRepository.findByUserId(userId);
        return user.getFirstName()+" "+user.getLastName();
    }
        // add exceptions
    public long getReportingManagerId(long userId){
        User user = userRepository.findByUserId(userId);
        return user.getReportingManagerId();
    }
    public String getUserEmailById(long userId){
        if(userRepository.existsById(userId)){
            User user = userRepository.findByUserId(userId);
            return user.getEmail();
        }
        return "User Not Found";
    }
    public List<User> getUsersByPartialId(Long userId) {
        List<User> allUsers = userRepository.findAll();

        // Filter users whose first names contain the provided partialName
        List<User> matchedUserIds = allUsers.stream()
                .filter(user -> user.getUserId().toString().contains(userId.toString()))
                .limit(4)  // Limit the results to 4 users
                .collect(Collectors.toList());
        return matchedUserIds;
    }
}
