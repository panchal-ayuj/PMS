package com.accolite.server.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GoalPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long goalPlanId;
    private Long userId;
    private Integer financialYear;

    private String goalPlanName;

}
