package com.clickhouse.ingestion.service;

import com.clickhouse.ingestion.model.ClickHouseConfig;
import com.clickhouse.jdbc.ClickHouseDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Slf4j
@Service
public class ClickHouseService {
    
    public List<String> getTables(ClickHouseConfig config) throws Exception {
        try (Connection connection = createConnection(config)) {
            List<String> tables = new ArrayList<>();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("SHOW TABLES FROM " + config.getDatabase());
            
            while (rs.next()) {
                tables.add(rs.getString(1));
            }
            return tables;
        }
    }
    
    public List<String> getColumns(ClickHouseConfig config) throws Exception {
        try (Connection connection = createConnection(config)) {
            List<String> columns = new ArrayList<>();
            Statement stmt = connection.createStatement();
            ResultSet rs = stmt.executeQuery("DESCRIBE TABLE " + config.getDatabase() + "." + config.getTable());
            
            while (rs.next()) {
                columns.add(rs.getString(1));
            }
            return columns;
        }
    }
    
    public long exportData(ClickHouseConfig config, String[] selectedColumns) throws Exception {
        try (Connection connection = createConnection(config)) {
            Statement stmt = connection.createStatement();
            String columnList = String.join(",", selectedColumns);
            String query = "SELECT " + columnList + " FROM " + config.getDatabase() + "." + config.getTable();
            
            if (config.getJoinCondition() != null && !config.getJoinCondition().isEmpty()) {
                query += " " + config.getJoinCondition();
            }
            
            ResultSet rs = stmt.executeQuery(query);
            // TODO: Implement streaming to file
            return 0; // Placeholder
        }
    }
    
    public long importData(ClickHouseConfig config, String[] columns, String data) throws Exception {
        try (Connection connection = createConnection(config)) {
            // TODO: Implement batch insert
            return 0; // Placeholder
        }
    }
    
    private Connection createConnection(ClickHouseConfig config) throws Exception {
        Properties properties = new Properties();
        properties.setProperty("user", config.getUsername());
        properties.setProperty("password", config.getJwtToken());
        
        String url = String.format("jdbc:clickhouse://%s:%d/%s",
                config.getHost(),
                config.getPort(),
                config.getDatabase());
                
        return new ClickHouseDataSource(url, properties).getConnection();
    }
} 