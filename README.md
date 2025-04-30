## Features

- **Express Framework**: A minimal and flexible Node.js web application framework that provides a robust set of features for building web and mobile applications.
- **TypeScript**: A superset of JavaScript that compiles to plain JavaScript, providing static typing and modern JavaScript features.
- **Prisma**: A modern database toolkit that simplifies database access and management.
- **Error Handling**: Centralized error handling middleware for consistent error responses.
- **Logging**: Winston logger for structured logging and debugging.
- **Generic Response Model**: A standard response format for all API responses.
- **Authentication**: JWT-based authentication for secure API access.
- **Authorization**: Permission-based access control to restrict access to certain routes.
- **Seeding**: Seed the database with initial data for development and testing.
- **Testing**: Unit and integration tests using Jest for ensuring code quality and reliability.
- **Validation**: Input validation using Joi to ensure data integrity.
- **Rate Limiting**: Basic rate limiting to prevent abuse of the API.
- **CORS**: Cross-Origin Resource Sharing (CORS) support for API access from different domains.
- **Swagger Documentation**: Automatically generated API documentation for easy reference and testing.
- **Environment Configuration**: Centralized configuration using `.env` files for managing environment variables.
- **Docker Support**: Dockerfile and docker-compose for easy deployment and containerization.

## Project Structure

```
├── prisma
│   ├── migrations
├── src
│   ├── routes
│   ├── controllers
│   ├── services
│   ├── models
│   ├── middlewares
│   ├── logger
│   ├── config
│   ├── utils
├── tests
│   ├── unit
│   ├── integration
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── jest.config.js
├── package.json
├── README.md
└── tsconfig.json
```

## How to Run the Project

1. **Clone the Repository**:

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory.
   - Add the required environment variables (e.g., `DATABASE_URL`, `PORT`, `SEED_DATA`, `JWT_SECRET_KEY`, `JWT_EXPIRES_MINUTE_TIME`, `REFRESH_TOKEN_EXPIRES_MINUTE_TIME`).

4. **Run Database Migrations**:

   ```bash
   npx prisma migrate dev deploy
   ```
    - By default, migrations are produced for PostgreSQL. If you are using a different database, firstly remove the existing migrations folder and then run the command below to create a new migration:

    ```bash
    npx prisma migrate dev --create-only --name <Migration_Name>
    ```

    - Then, run the migration using the command below:
    ```bash
    npx prisma migrate dev deploy
    ```

5. **Start the Server**:

   ```bash
   npm run start:dev
   ```
    - This will start the server in development mode with hot reloading.
    - If you want to seed the database with initial data, set the `SEED_DATA` environment variable to `true` in the `.env` file.

    - To run the server in production mode, use the command below:
    ```bash
    npm run start
    ```
    - This will start the server in production mode without hot reloading.

    - To run the server in production mode with Docker, use the command below:
    ```bash
    docker-compose up --build
    ```

6. **Access the Application**:

   - Open your browser and navigate to `http://localhost:<PORT>` (default is `3000`).

7. **Run Tests**:
   ```bash
   npm test
   ```

## Additional Notes
- **Database**: The project uses Prisma as the ORM. You can modify the `prisma/schema.prisma` file to change the database schema.
- **Logging**: The project uses Winston for logging. You can configure the logger in the `src/logger` directory.
- **Testing**: The project uses Jest for testing. You can add your tests in the `tests` directory.
- **Extending the Project**: Add new routes, controllers, and services in the respective folders to extend functionality.