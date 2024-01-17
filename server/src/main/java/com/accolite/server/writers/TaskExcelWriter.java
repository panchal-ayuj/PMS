package com.accolite.server.writers;

import com.accolite.server.models.Task;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Component
public class TaskExcelWriter {
    private Workbook workbook;
    private Sheet sheet;
    private int currentRow;

    public TaskExcelWriter() {
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet("Task Data");
        currentRow = 0;
    }

    public void addTask(Task task) {
        if (currentRow == 0) {
            createHeaderRow(task.toMap().keySet());
        }

        Row row = sheet.createRow(++currentRow);

        int cellIndex = 0;
        for (Object value : task.toMap().values()) {
            Cell cell = row.createCell(cellIndex++);
            if (value instanceof String) {
                cell.setCellValue((String) value);
            } else if (value instanceof Number) {
                cell.setCellValue(((Number) value).doubleValue());
            } else if (value instanceof Date) {
                cell.setCellValue((Date) value);
                CellStyle dateStyle = workbook.createCellStyle();
                CreationHelper createHelper = workbook.getCreationHelper();
                dateStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd HH:mm:ss"));
                cell.setCellStyle(dateStyle);
            } else if (value instanceof List) {
                cell.setCellValue(String.join(value.toString()));
            }
            // Add more conditions based on the data types you want to support
        }
    }

    private void createHeaderRow(Set<String> headers) {
        Row row = sheet.createRow(currentRow++);

        int cellIndex = 0;
        for (String header : headers) {
            Cell cell = row.createCell(cellIndex++);
            cell.setCellValue(header);
        }
    }

    public void writeToFile(String filename) throws IOException {
        try (FileOutputStream outputStream = new FileOutputStream(filename)) {
            workbook.write(outputStream);
            System.out.println("Excel file '" + filename + "' created successfully.");
        } finally {
            // Close workbook and release resources
            if (workbook != null) {
                workbook.close();
            }
        }

    }
}
