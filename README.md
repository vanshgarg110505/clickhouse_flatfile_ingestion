# ClickHouse FlatFile Ingestion Tool

A modern web application for seamlessly transferring data between ClickHouse databases and flat files (CSV, TSV, etc.) in both directions. Built with Spring Boot, React, and Docker.

![Project Screenshot](docs/screenshot.png)

## Features

- **ClickHouse to File Export**
  - Connect to any ClickHouse database
  - Select tables and columns to export
  - Export data in various flat file formats
  - Secure JWT-based authentication

- **File to ClickHouse Import**
  - Upload CSV/TSV files
  - Automatic header detection
  - Data preview before import
  - Column mapping support
  - Multiple delimiter support

## Prerequisites

Make sure you have the following installed:
- Java 17 or higher
- Node.js 16 or higher
- Docker and Docker Compose
- Maven 3.6 or higher

## Project Structure

```
clickhouse-flatfile-ingestion-tool/
├── backend/                 # Spring Boot backend
├── frontend/               # React frontend
├── docker/                 # Docker configurations
│   └── clickhouse/        # ClickHouse Docker setup
└── docs/                  # Documentation
```

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/clickhouse-flatfile-ingestion-tool.git
   cd clickhouse-flatfile-ingestion-tool
   ```

2. **Start ClickHouse using Docker**
   ```bash
   docker-compose up -d clickhouse
   ```

3. **Build and run the backend**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

4. **Install and run the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080
   - ClickHouse HTTP: http://localhost:8123

## Development Setup

### Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Configure application properties in `src/main/resources/application.properties`:
   ```properties
   server.port=8080
   spring.servlet.multipart.max-file-size=100MB
   spring.servlet.multipart.max-request-size=100MB
   ```

3. Build the project:
   ```bash
   mvn clean install
   ```

### Frontend Configuration

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### ClickHouse Configuration

Default ClickHouse credentials (configured in docker-compose.yml):
- Host: localhost
- HTTP Port: 8123
- TCP Port: 9000
- Database: default
- Username: default
- Password: default

## Testing

### Backend Tests

Run the backend tests using Maven:
```bash
cd backend
mvn test
```

### Frontend Tests

Run the frontend tests:
```bash
cd frontend
npm test
```

## Docker Deployment

Build and run all services using Docker Compose:

```bash
docker-compose up -d
```

This will start:
- ClickHouse database
- Spring Boot backend
- React frontend

## API Documentation

The backend API provides the following endpoints:

### ClickHouse Operations
- `POST /api/ingestion/clickhouse/tables` - Get available tables
- `POST /api/ingestion/clickhouse/columns` - Get columns for a table
- `POST /api/ingestion/clickhouse/export` - Export data to file

### File Operations
- `POST /api/ingestion/flatfile/headers` - Get file headers
- `POST /api/ingestion/flatfile/preview` - Preview file data
- `POST /api/ingestion/flatfile/process` - Import file data

## Security

- JWT-based authentication for ClickHouse connections
- CORS configuration for frontend-backend communication
- File size limits and validation

## Troubleshooting

### Common Issues

1. **ClickHouse Connection Issues**
   - Verify ClickHouse is running: `docker ps`
   - Check logs: `docker logs clickhouse`
   - Ensure correct port mapping

2. **File Upload Issues**
   - Check file size limits in application.properties
   - Verify file format and encoding

3. **Docker Issues**
   - Clear Docker volumes: `docker-compose down -v`
   - Rebuild containers: `docker-compose build --no-cache`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- ClickHouse for their excellent database
- Spring Boot team for the framework
- React team for the frontend framework
- All contributors and users of this tool 