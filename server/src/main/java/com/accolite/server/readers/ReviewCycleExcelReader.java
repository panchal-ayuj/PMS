package com.accolite.server.readers;

// Import statements

import com.accolite.server.models.ReviewCycle;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

public class ReviewCycleExcelReader {

    public static List<ReviewCycle> readReviewCyclesFromExcel(MultipartFile file) throws IOException {
        List<ReviewCycle> reviewCycles = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rowIterator = sheet.iterator();
            rowIterator.next(); // Skip header row

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                ReviewCycle reviewCycle = new ReviewCycle();
                reviewCycle.setWindowId(row.getCell(0) != null && row.getCell(0).getCellType() == CellType.NUMERIC ? (long) row.getCell(0).getNumericCellValue() : null);
                reviewCycle.setUserId(row.getCell(1) != null && row.getCell(1).getCellType() == CellType.NUMERIC ? (long) row.getCell(1).getNumericCellValue() : null);
                reviewCycle.setStartDate((row.getCell(2) != null ? row.getCell(2).getDateCellValue() : null));
                reviewCycle.setEndDate((row.getCell(3) != null ? row.getCell(3).getDateCellValue() : null));
                reviewCycle.setPeriod(row.getCell(4) != null ? row.getCell(4).getStringCellValue() : null);
                reviewCycle.setOverallRating(row.getCell(5) != null ? row.getCell(5).getStringCellValue() : null);
                reviewCycle.setReviewStatus(row.getCell(6) != null ? row.getCell(6).getStringCellValue() : null);
                reviewCycle.setFeedback(row.getCell(7) != null ? row.getCell(7).getStringCellValue() : null);
                reviewCycle.setReviewerId(row.getCell(8) != null && row.getCell(8).getCellType() == CellType.NUMERIC ? (long) row.getCell(8).getNumericCellValue() : null);
                reviewCycle.setSeniorRMfeedback(row.getCell(9) != null ? row.getCell(9).getStringCellValue() : null);
                reviewCycle.setSeniorRMId(row.getCell(10) != null && row.getCell(10).getCellType() == CellType.NUMERIC ? (long) row.getCell(10).getNumericCellValue() : null);
                reviewCycle.setSuperSeniorRMfeedback(row.getCell(11) != null ? row.getCell(11).getStringCellValue() : null);
                reviewCycle.setSuperSeniorRMId(row.getCell(12) != null && row.getCell(12).getCellType() == CellType.NUMERIC ? (long) row.getCell(12).getNumericCellValue() : null);
                reviewCycle.setUserFeedback(row.getCell(13) != null ? row.getCell(13).getStringCellValue() : null);

                reviewCycles.add(reviewCycle);
            }
        }

        return reviewCycles;
    }

    private static Date parseDate(String dateString) throws IOException {
        try {
            return dateString != null ? new SimpleDateFormat("yyyy-MM-dd").parse(dateString) : null;
        } catch (ParseException e) {
            throw new IOException("Error parsing date: " + e.getMessage());
        }
    }
}
