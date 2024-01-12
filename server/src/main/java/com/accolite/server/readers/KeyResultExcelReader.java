package com.accolite.server.readers;

import com.accolite.server.models.KeyResult;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class KeyResultExcelReader {

    public static List<KeyResult> readKeyResultsFromExcel(MultipartFile file) throws IOException {
        List<KeyResult> keyResults = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rowIterator = sheet.iterator();
            rowIterator.next(); // Skip header row

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                KeyResult keyResult = new KeyResult();
                keyResult.setUserId((long) (row.getCell(1).getNumericCellValue()));
                keyResult.setGoalPlanId((long) (row.getCell(2).getNumericCellValue()));
                keyResult.setKeyResultName(row.getCell(3).getStringCellValue());
                keyResult.setDescription(row.getCell(4).getStringCellValue());
                keyResult.setWeight((int) (row.getCell(5).getNumericCellValue()));
                keyResult.setPeriod(row.getCell(6).getStringCellValue());
                keyResults.add(keyResult);
            }
        }

        return keyResults;
    }
}

