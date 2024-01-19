package com.accolite.server.writers;

import com.accolite.server.models.KeyResult;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import java.io.FileOutputStream;
import java.io.IOException;

@Component
public class KeyResultExcelWriter {
    private Workbook workbook;
    private Sheet sheet;
    private int currentRow;

    public KeyResultExcelWriter() {
        workbook = new XSSFWorkbook();
        sheet = workbook.createSheet("KeyResult Data");
        currentRow = 0;
    }

    public void addKeyResult(KeyResult keyResult) {
        if (currentRow == 0) {
            createHeaderRow(keyResult.toMap().keySet());
        }

        Row row = sheet.createRow(++currentRow);

        int cellIndex = 0;
        for (Object value : keyResult.toMap().values()) {
            Cell cell = row.createCell(cellIndex++);
            if (value instanceof String) {
                cell.setCellValue((String) value);
            } else if (value instanceof Number) {
                cell.setCellValue(((Number) value).doubleValue());
            } else {
                // Handle other data types as needed
            }
        }
    }

    private void createHeaderRow(Iterable<String> headers) {
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
            if (workbook != null) {
                workbook.close();
            }
        }
    }

}
