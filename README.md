<p align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
  </a>
</p>

<h1 align="center">Books & Authors Management API</h1>

<p align="center">
An enterprise-ready, modular RESTful API developed with <strong>NestJS</strong>, <strong>TypeORM</strong>, and <strong>PostgreSQL</strong>, featuring complete CRUD operations, Many-to-Many relational data management, dynamic pagination, query filtering, environment variable configuration, and full Docker containerization.
</p>

---

## 📖 Project Description

This project was developed as a backend technical challenge for **LAPISCO**.

The application provides a robust, production-grade REST API for managing books and authors following NestJS best practices with Strict Mode enabled, using TypeORM for data access and PostgreSQL for persistent storage.

### Key Highlights:

- **Relational Database Design:** Efficiently manages Many-to-Many (`N:N`) relationships between Books and Authors via an automated junction table (`books_authors_authors`).
- **Autonomous Author Linking:** When creating or updating a book using author names, the system automatically binds existing author entities or creates missing records in the database on the fly.
- **Localized Date Input Parsing:** Accepts dates in the Brazilian format (`DD-MM-YYYY`) at the DTO layer and seamlessly converts them into standard database `DATE` objects (`YYYY-MM-DD`).
- **Standardized Pagination & Filtering:** Global pagination structure with response metadata (`totalItems`, `totalPages`, `currentPage`) alongside field-level text filters.
- **Full Containerization:** Dockerized setup for both the application service and PostgreSQL database with persistent storage volume configuration.

---

## 🛠️ Tech Stack & Architecture

- **Core Framework:** Node.js & [NestJS](https://nestjs.com/) (TypeScript with Strict Mode)
- **Database:** [PostgreSQL 15+](https://www.postgresql.org/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Containerization:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **Documentation:** [Swagger / OpenAPI 3.0](https://swagger.io/)
- **Validation & Transformation:** `class-validator` & `class-transformer`
- **Environment Management:** `@nestjs/config` & `dotenv`

---

## 📁 Project Structure

```text
src/
│
├── migrations/                # TypeORM database migration files
│
├── modules/                   # Domain modules
│   ├── authors/               # Authors domain (Controllers, Services, DTOs)
│   └── books/                 # Books domain (Controllers, Services, DTOs)
│
├── shared/                    # Shared resources and cross-cutting concerns
│   ├── entities/              # Base and shared TypeORM entities
│   ├── enums/                 # Application-wide enumerations
│   └── pagination/            # Global pagination DTOs and interfaces
│
├── app.module.ts              # Root application module
├── data-source.ts             # TypeORM Data Source configuration
└── main.ts                    # Application bootstrap & Swagger setup
```
---
# ⚙️ Prerequisites
Before running this project, ensure you have the following installed locally:

- Node.js (v18 or higher)

- npm (v9 or higher)

- Docker Desktop (v20.10+) & Docker Compose (v2.0+)

- Git
  
---

# 🔐 Environment Variables
Create a ``` .env ``` file in the project root directory based on the following template:
```
# Application Port
PORT=3000

# PostgreSQL Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres_db
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
PORT=3000
```
---
# 📦 Installation

Clone the repository to your local machine:

```bash
git clone <repository-url>
```
Navigate into the project directory:
```bash
cd project-name
```
Install all required dependencies:
```bash
npm install
```
---
# 🐳 Running PostgreSQL with Docker
Start the application services and PostgreSQL container in background mode:
```bash
docker-compose up -d --build
```
  The API will be operational at: http://localhost:3000
  
Verify that the containers are up and running:
```bash
docker ps
```
Stop the containers safely while keeping your database data intact:
```bash
docker-compose down
```
  ⚠️ Note: Avoid using ``` docker-compose down -v ``` unless you explicitly want to delete the persistent PostgreSQL volume and reset all stored database records.
  
---
# 🗄️ Database Migrations
This project uses TypeORM migrations to track and manage database schema changes safely.

Run pending migrations against the database:
```bash
npm run typeorm -- migration:run -d ./src/data-source.ts
```
Revert the last executed migration:
```bash
npm run typeorm -- migration:revert -d ./src/data-source.ts
```
Show the status of all migrations:
```bash
npm run typeorm -- migration:show -d ./src/data-source.ts
```
---
# ▶️ Running the Application
**Local Development Mode (outside Docker)**

Start the NestJS server in watch mode for development:
```bash
npm run start:dev
```
Start in normal mode:
```bash
npm run start
```
Start in production mode:
```bash
npm run start:prod
```
---
# 📚 OpenAPI / Swagger Documentation
Once the application is running, access the interactive Swagger UI at:
```
http://localhost:3000/api/docs
```
Swagger provides:

- Complete endpoint documentation

- Interactive request execution (Try it out)

- Request body and response payload examples

- Schema inspection
---
# 🔄 API Endpoint Overview
### 📚 Books Module (`/books`)

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/books` | Create a new book entry & bind authors | None |
| `GET` | `/api/books` | Retrieve paginated list of books | `page`, `limit`, `titulo`, `autor` |
| `GET` | `/api/books/:id` | Retrieve book details by ID | None |
| `PATCH` | `/api/books/:id` | Update an existing book's details | None |
| `DELETE` | `/api/books/:id` | Delete a book record | None |

### ✍️ Authors Module (`/authors`)

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/authors` | Create an individual author record | None |
| `GET` | `/api/authors` | Retrieve paginated list of authors | `page`, `limit`, `nome` |
| `GET` | `/api/authors/:id` | Retrieve author details by ID | None |
| `PATCH` | `/api/authors/:id` | Update an existing author's details | None |
| `DELETE` | `/api/authors/:id` | Delete an author record | None |

---
# 📄 Payload & Query Examples
1. Create Author ( ``` POST /authors ``` )
```
{
  "nome": "Rick Riordan",
  "dataNascimento": "05-06-1964",
  "biografia": "American author famous for fantasy adventure novels."
}
```
2. Create Book ( ``` POST /books ``` )
```
{
  "titulo": "The Lightning Thief",
  "descricao": "A fantasy adventure centered around Greek mythology.",
  "dataPublicacao": "01-07-2005",
  "authorNames": [
    "Rick Riordan"
  ]
}
```
3. Paginated Query with Filters ( ``` GET /books?page=1&limit=2&titulo=Lightning ``` )
```
{
  "data": [
    {
      "id": "e3b0c442-98fc-4c14-9510-0a370b377b21",
      "titulo": "The Lightning Thief",
      "descricao": "A fantasy adventure centered around Greek mythology.",
      "dataPublicacao": "2005-07-01",
      "authors": [
        {
          "id": "a1d3f234-89bc-4d88-8111-2c3b4a5d6e7f",
          "nome": "Rick Riordan"
        }
      ]
    }
  ],
  "meta": {
    "totalItems": 1,
    "itemCount": 1,
    "itemsPerPage": 2,
    "totalPages": 1,
    "currentPage": 1
  }
}
```
---
# ✅ Features

### 🚀 Core Architecture & REST API
- **Modular Architecture:** Well-structured NestJS module design enforcing separation of concerns between controllers, services, entities, and DTOs.
- **Full CRUD Support:** Complete Create, Read, Update, and Delete operations for both Books and Authors resources.
- **Strict Mode Enabled:** Enforces strict TypeScript configuration for higher code reliability and type safety.

### 🗄️ Database & Data Persistence
- **PostgreSQL & TypeORM:** High-performance relational database management with TypeORM integration for seamless object-relational mapping.
- **Many-to-Many Relational Design:** Handles complex $N:N$ relationships between Books and Authors via an automated junction table (`books_authors_authors`).
- **Autonomous Entity Binding:** Automatically links existing authors or creates new ones during book creation without requiring manual author ID lookups.
- **TypeORM Migrations:** Includes manual and automated database migration tracking via `data-source.ts` to guarantee schema integrity.
- **Persistent Data Storage:** Docker volume mounting ensures database state is fully retained between container restarts.

### 📊 Filtering, Pagination & Date Parsing
- **Standardized Pagination:** Configurable `page` and `limit` query parameters with structured metadata responses (`totalItems`, `totalPages`, `currentPage`).
- **Advanced Query Filtering:** Text-based search support for titles and author names directly through endpoint queries.
- **Localized Date Input Parsing:** Accepts Brazilian date formats (`DD-MM-YYYY`) at the API layer and auto-converts them to standard SQL `DATE` objects (`YYYY-MM-DD`).

### 🛡️ Validation & Error Handling
- **DTO Payload Sanitization:** Strict input validation powered by `class-validator` and `class-transformer`.
- **Global Validation Pipe:** Auto-transforms query strings to native numbers/booleans and strips non-whitelisted payload properties.
- **Custom Exception Filtering:** Standardized HTTP response structures for 400 (Bad Request), 404 (Not Found), and 500 (Internal Error).

### 🐳 DevOps & Developer Experience
- **Docker & Docker Compose Support:** One-command environment setup (`docker-compose up -d --build`) for running both the API and PostgreSQL in isolated containers.
- **Interactive Swagger Documentation:** Built-in OpenAPI 3.0 UI (`/api`) providing dynamic schema testing, request examples, and response definitions.
- **Environment Variable Management:** Centralized configuration via `.env` files and `@nestjs/config`.
