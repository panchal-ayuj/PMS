package com.accolite.server.readers;

import com.accolite.server.models.GoalPlan;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class GoalPlanExcelReader {

    public static List<GoalPlan> readGoalPlansFromExcel(MultipartFile file) throws IOException {
        List<GoalPlan> goalPlans = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rowIterator = sheet.iterator();
            rowIterator.next(); // Skip header row

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                GoalPlan goalPlan = new GoalPlan();
                goalPlan.setUserId((long) (row.getCell(1).getNumericCellValue()));
                goalPlan.setFinancialYear((int) (row.getCell(2).getNumericCellValue()));
                goalPlans.add(goalPlan);
            }
        }

        return goalPlans;
    }
}
