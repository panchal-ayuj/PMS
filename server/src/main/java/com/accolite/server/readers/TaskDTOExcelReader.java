package com.accolite.server.readers;

import com.accolite.server.models.TaskDTO;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class TaskDTOExcelReader {
    public static List<TaskDTO> readTasksFromExcel(MultipartFile file) throws IOException {
        List<TaskDTO> taskDTOs = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rowIterator = sheet.iterator();
            rowIterator.next(); // Skip header row

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                TaskDTO taskDTO = new TaskDTO();
                taskDTO.setKeyResultName(row.getCell(0).getStringCellValue());
                taskDTO.setDescription(row.getCell(1).getStringCellValue());
                taskDTO.setCreationDate(row.getCell(2).getDateCellValue());
                taskDTO.setDeadline(row.getCell(3).getDateCellValue());
                taskDTO.setWeight((int) row.getCell(4).getNumericCellValue());
                taskDTO.setCompletionStatus(row.getCell(5).getStringCellValue());
                taskDTO.setUserId((int) row.getCell(6).getNumericCellValue());
                taskDTO.setWindowId((int) row.getCell(7).getNumericCellValue());
                taskDTO.setRating((int) row.getCell(8).getNumericCellValue());
                taskDTO.setFeedback(row.getCell(9).getStringCellValue());
                taskDTO.setPeriod(row.getCell(10).getStringCellValue());
                taskDTOs.add(taskDTO);
            }
        }

        return taskDTOs;
    }
}
