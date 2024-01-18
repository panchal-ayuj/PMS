package com.accolite.server.controllers;

import com.accolite.server.models.GoalPlan;
import com.accolite.server.models.GoogleTokenPayload;
import com.accolite.server.models.User;
import com.accolite.server.readers.UserExcelReader;
import com.accolite.server.repository.UserRepository;
import com.accolite.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> handleFileUpload(@RequestParam("file") MultipartFile file) {
        try {
            List<User> users = UserExcelReader.readUsersFromExcel(file);
            userService.saveAll(users);
            return ResponseEntity.status(HttpStatus.OK).body("File uploaded successfully.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error uploading file: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserDetails(@PathVariable Long userId) {
        User user = userService.getUserDetails(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUserDetails(@PathVariable Long userId, @RequestBody User updatedUser) {
        User user = userService.updateUser(userId, updatedUser);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/{userId}/hierarchy")
    public ResponseEntity<List<User>> getUserHierarchy(@PathVariable Long userId) {
        List<User> hierarchy = userService.getUserHierarchy(userId);
        return new ResponseEntity<>(hierarchy, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/export")
    public ResponseEntity<Object> exportEmployeesToExcel() {
        List<User> users = userRepository.findAll();
        String filePath = "employee_data_export.xlsx";

        try {
            userService.generateEmployeeExcelFile(users, filePath);

            // Read the file content
            byte[] fileContent = Files.readAllBytes(Paths.get(filePath));

            // Create a ByteArrayResource from the file content
            ByteArrayResource resource = new ByteArrayResource(fileContent);

            // Set the Content-Disposition header to prompt the user for download
            HttpHeaders headers = new HttpHeaders();
            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=employee_data_export.xlsx");

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

    @PostMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmailExists(@RequestBody GoogleTokenPayload googleTokenPayload) {
        Optional<User> emailExists = userRepository.findByEmail(googleTokenPayload.getEmail());
        System.out.println(googleTokenPayload.getEmail());
        boolean exists = false;
        if (emailExists.isPresent()) {
            exists = true;
        }
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/userById/{userId}")
    public ResponseEntity<User> getGoalPlanById(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/userById/{userId}")
    public ResponseEntity<User> updateGoalPlan(@PathVariable Long userId, @RequestBody User updatedUser) {
        User existingUser = userService.getUserById(userId);

        if (existingUser != null) {
            // Update the existing goal plan with the values from the updatedGoalPlan
            updatedUser.setUserId(existingUser.getUserId());
            // ... (set other fields accordingly)

            User savedUser = userRepository.save(updatedUser); // Assuming you have a method like this

            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @GetMapping("/team-members/{reportingManagerId}")
    public ResponseEntity<List<User>> getTeamMembers(@PathVariable Long reportingManagerId) {
        List<User> teamMembers = userService.getUsersByReportingManagerId(reportingManagerId);
        return new ResponseEntity<>(teamMembers, HttpStatus.OK);
    }


    @GetMapping("/reporting-chain/{userId}")
    public Map<String, Map<String, List<String>>> getUsersAndReportingChain(@PathVariable Long userId) {
        // Fetch users based on reportingManagerId
        List<User> directReports = userRepository.findByReportingManagerId(userId);

        // Fetch users for whom the direct reports are reporting managers
        List<Long> directReportIds = directReports.stream()
                .map(User::getUserId)
                .collect(Collectors.toList());

        List<User> indirectReports = userRepository.findByReportingManagerIdIn(directReportIds);

        // Create a Map<String, List<String>> where each direct report's first name is mapped to a list of indirect reports' first names
        Map<String, Map<String, List<String>>> finalMap = new HashMap<>();
        User user = userRepository.findByUserId(userId);

        Map<String, List<String>> directReportMap = new HashMap<>();
        for (User directReport : directReports) {
            List<String> indirectReportFirstNames = indirectReports.stream()
                    .filter(indirectReport -> indirectReport.getReportingManagerId().equals(directReport.getUserId()))
                    .map(User::getFirstName)
                    .collect(Collectors.toList());
            directReportMap.put(directReport.getFirstName(), indirectReportFirstNames);
        }
        finalMap.put(user.getFirstName(), directReportMap);

        return finalMap;
    }// Assuming you have a UserService

    @GetMapping("/searchUsersByName/{searchName}")
    public ResponseEntity<User > searchUsersByName(@PathVariable String searchName) {
        // Validate searchName if needed

        User user = userService.getUserByName(searchName);
        return ResponseEntity.ok(user);
    }
}
