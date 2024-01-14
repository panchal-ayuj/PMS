package com.accolite.server.readers;

import com.accolite.server.models.User;
import org.apache.poi.ss.usermodel.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
public class UserExcelReader {
    public static List<User> readUsersFromExcel(MultipartFile file) throws IOException {
        List<User> users = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream()) {
            Workbook workbook = WorkbookFactory.create(inputStream);
            Sheet sheet = workbook.getSheetAt(0);

            Iterator<Row> rowIterator = sheet.iterator();
            rowIterator.next(); // Skip header row

            while (rowIterator.hasNext()) {
                Row row = rowIterator.next();
                User user = new User();
                user.setUserId((long) (row.getCell(0).getNumericCellValue()));
                user.setFirstName((String) (row.getCell(1).getStringCellValue()));
                user.setLastName((String) (row.getCell(2).getStringCellValue()));
                user.setEmail((String) (row.getCell(3).getStringCellValue()));
                user.setStatus((String) (row.getCell(4).getStringCellValue()));
                user.setJoiningDate((Date) row.getCell(5).getDateCellValue());
                user.setHrId((long) (row.getCell(6).getNumericCellValue()));
                user.setBand((String) (row.getCell(7).getStringCellValue()));
                user.setReportingManagerId((long) (row.getCell(8).getNumericCellValue()));
                user.setRoles(Arrays.asList(row.getCell(9).getStringCellValue().split(",")));
                user.setTeams(Arrays.asList(row.getCell(10).getStringCellValue().split(",")));

                users.add(user);
            }
        }

        return users;
    }
}
