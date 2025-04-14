package com.clickhouse.ingestion.service;

import com.clickhouse.ingestion.model.FlatFileConfig;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class FlatFileService {
    
    public List<String> getHeaders(FlatFileConfig config) throws Exception {
        try (Reader reader = new BufferedReader(new InputStreamReader(config.getFile().getInputStream()))) {
            CSVParser parser = new CSVParser(reader, CSVFormat.DEFAULT.withDelimiter(config.getDelimiter().charAt(0)));
            List<String> headers = new ArrayList<>();
            
            if (parser.getRecords().size() > 0) {
                CSVRecord headerRecord = parser.getRecords().get(0);
                for (String header : headerRecord) {
                    headers.add(header.trim());
                }
            }
            
            return headers;
        }
    }
    
    public List<List<String>> previewData(FlatFileConfig config, int limit) throws Exception {
        try (Reader reader = new BufferedReader(new InputStreamReader(config.getFile().getInputStream()))) {
            CSVParser parser = new CSVParser(reader, CSVFormat.DEFAULT.withDelimiter(config.getDelimiter().charAt(0)));
            List<List<String>> preview = new ArrayList<>();
            
            int count = 0;
            for (CSVRecord record : parser) {
                if (count >= limit) break;
                
                List<String> row = new ArrayList<>();
                for (String value : record) {
                    row.add(value.trim());
                }
                preview.add(row);
                count++;
            }
            
            return preview;
        }
    }
    
    public long processFile(FlatFileConfig config) throws Exception {
        try (Reader reader = new BufferedReader(new InputStreamReader(config.getFile().getInputStream()))) {
            CSVParser parser = new CSVParser(reader, CSVFormat.DEFAULT.withDelimiter(config.getDelimiter().charAt(0)));
            long count = 0;
            
            // Skip header row
            boolean isFirst = true;
            for (CSVRecord record : parser) {
                if (isFirst) {
                    isFirst = false;
                    continue;
                }
                // TODO: Process record based on selected columns
                count++;
            }
            
            return count;
        }
    }
} 