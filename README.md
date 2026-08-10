<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 📚 Books & Authors Management API

An enterprise-ready, modular RESTful API built with **NestJS**, **TypeScript**, and **TypeORM**, featuring persistent storage with **PostgreSQL** in containerized environments. 

This service provides end-to-end CRUD operations for managing books and authors, supporting Many-to-Many entity relationships, advanced query filtering, dynamic pagination, and robust input sanitization.

---

## 🛠 Tech Stack & Architecture

- **Core Framework:** [NestJS](https://nestjs.com/) (TypeScript)
- **Database:** [PostgreSQL 15+](https://www.postgresql.org/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Containerization:** [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- **API Documentation:** [Swagger / OpenAPI 3.0](https://swagger.io/)
- **Validation & Transformation:** `class-validator`, `class-transformer`

---

## Key Features & Design Patterns

- **Modular Domain Design:** Enforces strict separation of concerns into isolated feature modules (`books`, `authors`, `common`).
- **Autonomous Many-to-Many Linking:** When creating/updating a book with author names, the system automatically binds existing authors or creates missing ones atomically.
- **Localized Date Parsing:** Accepts user-friendly date strings in `DD-MM-YYYY` format via DTO layer and seamlessly transforms them into standard database `DATE` objects (`YYYY-MM-DD`).
- **Data Transfer Objects (DTOs) & Pipes:** Strict validation of incoming payloads using custom pipes and `class-validator` decorators to prevent invalid data ingestion.
- **Global Pagination & Filtering:** Standardized query DTOs delivering pagination metrics (`totalItems`, `totalPages`, `currentPage`) alongside field-specific text search.

---

## 📋 Prerequisites

Ensure you have the following software installed on your local environment:

- **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (v20.10+)
- **[Docker Compose](https://docs.docker.com/compose/install/)** (v2.0+)
- **[Node.js](https://nodejs.org/)** (v18+) & **npm**

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory of the project based on the example configuration below:

```env
# Application Port
PORT=3000

# PostgreSQL Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
PORT=3000
```

##🚀 Getting Started & Execution
Follow these step-by-step instructions to get the application up and running locally.

1. Clone the Repository
-Clone the project repository to your local machine:
```
git clone <REPOSITORY_URL>
cd <REPOSITORY_FOLDER>
```
2. Install Project Dependencies
-Install all local Node.js packages and development dependencies defined in package.json:
```
npm install
```
3. Build and Start Application via Docker
-Build the container images and launch both the NestJS API and PostgreSQL database services in detached background mode:
```
docker-compose up -d --build
```
4. Stopping the Application
-To safely stop and remove the active containers while preserving all stored PostgreSQL data inside the persistent volume:
```
docker-compose down
```
⚠️ Data Safety Note: Avoid running docker-compose down -v unless you intend to completely erase the persistent database volume and clear all stored records.
