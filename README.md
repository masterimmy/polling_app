# Project Setup Instructions

Follow these steps to set up the project on your local environment:

## Prerequisites
Ensure you have the following installed:
- Node.js and npm
- PHP (version 7.4 or higher)
- Composer
- MySQL
- Laravel (if not already installed globally)

---

## Installation Steps

1. **Install Node Modules**
   ```bash
   npm install
   ```

2. **Install PHP Dependencies**
   ```bash
   composer install
   ```
   If you encounter issues, delete the `composer.lock` file and run the command again:
   ```bash
   rm composer.lock
   composer install
   ```

3. **Set Up Environment File**
   - Copy the `.env.example` file and rename it to `.env`.
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and set the username and password for your MySQL database.

4. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

5. **Run Migrations and Seed the Database**
   ```bash
   php artisan migrate --seed
   ```

6. **Default Users and Passwords**
   The database seeder creates the following default users. Use the credentials below for testing or accessing the application:
   - **Admin Accounts:**
     - `admin1@gmail.com`
     - `admin2@gmail.com`
   - **User Accounts:**
     - `user1@gmail.com`
     - `user2@gmail.com`
     - `user3@gmail.com`
     - `user4@gmail.com`
     - `user5@gmail.com`
   - **Password for All Accounts:** `password`

---

## Build and Serve the Application

1. Build assets:
   ```bash
   composer run dev
   ```

The application should now be accessible at `http://localhost:8000`.

---

## Troubleshooting
- Ensure your MySQL service is running.
- Double-check the database credentials in your `.env` file.
- If you face issues with migrations, verify that the database exists and is empty.
- For further assistance, refer to the Laravel documentation or contact the project maintainer.

---

**Happy Coding!**
