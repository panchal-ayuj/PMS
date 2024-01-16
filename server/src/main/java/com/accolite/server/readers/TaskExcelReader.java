package com.accolite.server.readers;

import com.accolite.server.models.Task;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class TaskExcelReader {
    public static List<Task> readUsersFromExcel(MultipartFile file) throws IOException {
        List<Task> tasks = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rowIterator = sheet.iterator();
            rowIterator.next(); // Skip header row

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Task task = new Task();
                task.setTaskId((long) (row.getCell(0).getNumericCellValue()));
                task.setKeyResultId((int) (row.getCell(1).getNumericCellValue()));
                task.setDescription((String) (row.getCell(2).getStringCellValue()));
                task.setCreationDate((Date) row.getCell(3).getDateCellValue());
                task.setDeadline((Date) row.getCell(4).getDateCellValue());
                task.setWeight((int) (row.getCell(5).getNumericCellValue()));
                task.setCompletionStatus((String) (row.getCell(6).getStringCellValue()));
                task.setUserId((int) (row.getCell(7).getNumericCellValue()));
                task.setWindowId((int) (row.getCell(8).getNumericCellValue()));
                task.setRating((int) (row.getCell(9).getNumericCellValue()));
                task.setFeedback((String) (row.getCell(10).getStringCellValue()));
                task.setPeriod((String) (row.getCell(11).getStringCellValue()));
                task.setTaskAttributes(Arrays.asList(row.getCell(12).getStringCellValue().split(",")));

                tasks.add(task);
            }
        }

        return tasks;
    }
}
