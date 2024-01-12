package com.accolite.server.taskModel;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


import java.sql.Date;
import java.util.List;
@Getter
@Setter
@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;

    private String description;


    private Date creationDate;


    private Date deadline;

    private int weight;

    private String completionStatus;

    @ElementCollection
    private List<String> taskAttributes;


    private int keyResult;

    private int assignedTo;



    // Constructors, getters, setters, and other methods
}
