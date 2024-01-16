package com.accolite.server.writers;

import com.accolite.server.models.User;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.util.Date;
import java.util.List;
import java.util.Set;
import  java.io.IOException;
@Component
public class UserExcelWriter {
    private Workbook workbook;
    private Sheet sheet;
    private int currentRow;

    public UserExcelWriter() {
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet("Employee Data");
        currentRow = 0;
    }

    public void addUser(User user) {
        if (currentRow == 0) {
            createHeaderRow(user.toMap().keySet());
        }

        Row row = sheet.createRow(++currentRow);

        int cellIndex = 0;
        for (Object value : user.toMap().values()) {
            Cell cell = row.createCell(cellIndex++);
            if (value instanceof String) {
                cell.setCellValue((String) value);
            } else if (value instanceof Number) {
                cell.setCellValue(((Number) value).doubleValue());
            } else if (value instanceof Date) {
                cell.setCellValue((Date) value);
                CellStyle dateStyle = workbook.createCellStyle();
                CreationHelper createHelper = workbook.getCreationHelper();
                dateStyle.setDataFormat(createHelper.createDataFormat().getFormat("yyyy-MM-dd"));
                cell.setCellStyle(dateStyle);
            } else if (value instanceof List) {
                cell.setCellValue(value.toString());
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
        }
    }
}
