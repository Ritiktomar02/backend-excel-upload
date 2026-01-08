# Backend Assignment — File Upload & Excel Processing ✅

## Overview ✨

This project provides backend APIs to:

- Upload Excel/CSV files (`xls`, `xlsx`, `csv`) and store them locally
- Process Excel/CSV files and persist valid records into a PostgreSQL database
- Retrieve stored records with pagination and optional filtering

This README documents project setup, API routes, validation rules, and sample requests to verify the application behavior.

---

## Quick Setup 🚀

### Clone & Install

```bash
git clone <repository-url>
cd backend-excel-upload
npm install
```

### Environment Variables

Create a .env file in the project root (or set them in your environment):
``` env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=excel_assignment_db
DB_USER=postgres
DB_PASSWORD=your_password
```

Ensure PostgreSQL is running and the database exists.

### Start the Server

```bash
npm run dev
```
---

## File Storage 📁

- Uploaded files are stored under the uploads/ directory.
- Files are saved locally as required by the assignment.
- Only valid file formats are accepted during upload.
  
---

## API Endpoints 📚

### Base URL

```text
http://localhost:3000
```
---

## Upload File

### Endpoint
```text
POST /api/v1/files/upload
```

### Description

Uploads a single Excel or CSV file and saves it locally on the server.

### Rules

*   Allowed extensions: .xls, .xlsx, .csv
    
*   Maximum file size: **5MB**
    

### Request

*   Content-Type: multipart/form-data
    
*   Field name: file
    

### Success Response (201)

```text
{
    "message": "File uploaded successfully",
    "filePath": "uploads/1767869430788.xlsx"
}
```

### Error Responses

*   400 – Invalid file type
    
*   413 – File too large (greater than 5MB)

---

## Process Excel / CSV

### Endpoint

```text
POST /api/v1/files/process-excel
```

### Description

Accepts an Excel or CSV file, validates each row, inserts valid rows into the database, and returns a summary.

### Expected File Format (Header Row)

``` text
Id | Name | Age | Education
```

### Validation Rules (Per Row)

*   **Id**: Required, must be unique
    
*   **Name**: Required, non-empty
    
*   **Age**: Required, positive number (> 0)
    
*   **Education**: Required, non-empty
    
*   Invalid rows are skipped and logged
    

### Request

*   Content-Type: multipart/form-data
    
*   Field name: file
    

### Sample Success Response (200)

``` text
{
    "inserted": 4,
    "skipped": 0
}
```

### Notes

*   Invalid rows do **not** stop processing
    
*   Skipped rows are logged for debugging
    
*   Database constraint violations are handled safely

---

## Get All Records

### Endpoint

``` text
GET /api/v1/files/getAll
```

### Query Parameters

*   page (integer, default: 1)
    
*   limit (integer, default: 10)
    
*   education (optional filter)
    

### Example Request

``` text
GET /api/v1/files/getAll?page=1&limit=10&education=BTech
```

### Success Response (200)

``` text
{
  "page": 1,
  "limit": 10,
  "total": 4,
  "data": [
            {  "id": 1,
               "name": "Ritik Tomar",
               "age": 22,
               "education": "BTech"
             }
          ]
 }
```

---

## Database & Model 📦


*   **Database**: PostgreSQL
    
*   **ORM**: Sequelize
    

### Table: Records

| Column     | Type      | Constraints              |
|------------|-----------|--------------------------|
| id         | INTEGER   | PRIMARY KEY, UNIQUE      |
| name       | STRING    | NOT NULL                 |
| age        | INTEGER   | NOT NULL, > 0            |
| education  | STRING    | NOT NULL                 |
| createdAt  | TIMESTAMP | Auto-generated           |
| updatedAt  | TIMESTAMP | Auto-generated           |


*   sequelize.sync() is used for table creation in development
    
*   Database migrations are recommended for production environments

---

## Error Handling & Logging 🔍


*   Invalid file formats and sizes return proper HTTP status codes
    
*   Excel parsing and database errors are handled gracefully
    
*   Invalid rows are skipped without crashing the process
    
*   Console logs provide visibility into skipped rows and successful inserts

---

## Testing 🧪


*   APIs tested using **Postman**
    
*   Database verified using **pgAdmin**
    
*   Excel processing validated using real .xlsx and .csv files

---
## Design Notes 🧠


*   Files are stored locally as per assignment requirements
    
*   Strict validation ensures database integrity
    
*   Clean separation of concerns (routes, controllers, models)
    
*   Simple and readable architecture for easy maintenance

---
## Conclusion ✅


This project satisfies all assignment requirements by delivering:

*   Clean and well-structured backend APIs
    
*   Robust file upload and Excel processing logic
    
*   SQL-based data persistence with proper constraints
    
*   Pagination and filtering support
    
*   Production-ready backend architecture
