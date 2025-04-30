## Features

- **Express Framework**: A minimal and flexible Node.js web application framework for building APIs and web applications.
- **Prisma ORM**: A modern database toolkit to query, migrate, and model your database with ease.
- **Environment Configuration**: Centralized configuration using `.env` files for managing environment variables.
- **Error Handling**: Centralized error handling middleware for consistent error responses.
- **Logging**: Integrated logging for debugging and monitoring.
- **Modular Structure**: Organized folder structure for scalability and maintainability.
- **API Documentation**: Easily extendable API documentation using Swagger.

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

5. **Start the Development Server**:
    ```bash
    npm run start:dev
    ```

6. **Access the Application**:
    - Open your browser and navigate to `http://localhost:<PORT>` (default is `3000`).

7. **Run Tests (if available)**:
    ```bash
    npm test
    ```

## Additional Notes

- **Database Configuration**: Ensure your database is running and the `DATABASE_URL` in the `.env` file is correctly configured.
- **Extending the Project**: Add new routes, controllers, and services in the respective folders to extend functionality.
