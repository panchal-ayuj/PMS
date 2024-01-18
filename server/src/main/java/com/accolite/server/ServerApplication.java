package com.accolite.server;

import com.accolite.server.service.ReminderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class ServerApplication {

	public static void main(String[] args) {

		SpringApplication.run(ServerApplication.class, args);

//		ReminderService reminderService = new ReminderService();
//		reminderService.sendReminderEmailsForPendingReviews();
	}

}
