package com.accolite.server.service;

import com.accolite.server.models.ReviewCycle;
import com.accolite.server.models.User;
import com.accolite.server.repository.ReviewCycleRepository;
import com.accolite.server.writers.ReviewCycleWriter;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public  class ReminderService {

    @Autowired
    private ReviewCycleRepository reviewCycleRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender javaMailSender;

    @Scheduled(cron = "0 0 8 * * ?") //
    public void sendReminderEmailsForPendingReviews() {
        Calendar calendar = Calendar.getInstance();
        Date currentDate = calendar.getTime();
        List<ReviewCycle> pendingReviews = reviewCycleRepository.findByReviewStatusAndEndDateGreaterThan("pending", currentDate);

        if (!pendingReviews.isEmpty()) {

            Map<Long, List<ReviewCycle>> reviewsByReportingManager = pendingReviews.stream()
                    .collect(Collectors.groupingBy(ReviewCycle::getReviewerId));
            for (Map.Entry<Long, List<ReviewCycle>> entry : reviewsByReportingManager.entrySet()) {
                Long reportingManagerId = entry.getKey();
                String reportingManagerEmail = userService.getUserEmailById(reportingManagerId);
                Long seniorReportingManagerId = userService.getReportingManagerId(reportingManagerId);
                String seniorReportingManagerEmail = userService.getUserEmailById(seniorReportingManagerId);
                Long uniqueId = entry.getValue().get(0).getWindowId();
                // Generate the Excel file with details of the pending reviews
                String excelFilePath = "C:\\Users\\ganesh.raigond\\Desktop\\PMS\\server\\pending_reviews"+uniqueId+".xlsx";
                generatePendingReviewsExcelFile(entry.getValue(), excelFilePath);

                // Send a single email with the Excel file attached to the reporting manager
                sendReminderEmailWithAttachment(reportingManagerEmail, excelFilePath);

                // Send a reminder email to the senior reporting manager without attachment
                sendReminderEmailToSeniorManager(seniorReportingManagerEmail, reportingManagerId, seniorReportingManagerId);
            }
        }
    }

    private void sendReminderEmailWithAttachment(String recipientEmail, String excelFilePath) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            // Use MimeMessageHelper to set properties such as attachments
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(recipientEmail);
            helper.setSubject("Reminder: Pending Reviews Report");
            helper.setText("Dear Reviewer,\n\n"
                    + "This is a reminder that there are pending reviews for the review cycle.\n"
                    + "Please find the attached Excel file for details.\n\n"
                    + "Thank you,\nYour Application");

            // Attach the Excel file
            FileSystemResource file = new FileSystemResource(new File(excelFilePath));
            helper.addAttachment("pending_reviews.xlsx", file);

            // Send the email
            javaMailSender.send(mimeMessage);
        } catch (MessagingException e) {
            // Handle or log the exception appropriately
            e.printStackTrace();
        }
    }
    public void generatePendingReviewsExcelFile(List<ReviewCycle> pendingReviews, String filePath) {
        // Create an instance of your Excel writer (e.g., ReviewCycleExcelWriter)
        ReviewCycleWriter excelWriter = new ReviewCycleWriter();

        // Add each pending review to the Excel writer
        for (ReviewCycle review : pendingReviews) {
            excelWriter.addReviewCycle(review);
        }

        // Write the Excel file
        try {
            excelWriter.writeToFile(filePath);
        } catch (IOException e) {
            // Handle or log the exception appropriately
            e.printStackTrace();
        }
    }
    private void sendReminderEmailToSeniorManager(String seniorReportingManagerEmail, Long reportingManagerId,Long seniorReportingManagerId) {
        // Use JavaMailSender to send a simple reminder email without attachment
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(seniorReportingManagerEmail);
        mailMessage.setSubject("Reminder: Teammate's Pending Review");
        mailMessage.setText("Dear " + userService.getUserFullName(seniorReportingManagerId) + ",\n\n"
                + "This is a reminder that one of your team members has pending reviews.\n"
                + "Please ensure timely completion of the reviews.\n\n"
                + "Reviewer : "+ userService.getUserFullName(reportingManagerId)+"\n"
                + "Thank you,\nHR Department");

        javaMailSender.send(mailMessage);
    }

}
