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

3. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

4. **Set Up Environment File**
   - Copy the `.env.example` file and rename it to `.env`.
     ```bash
     cp .env.example .env
     ```
   - Open the `.env` file and set the username and password for your MySQL database.

5. **Run Migrations and Seed the Database**
   ```bash
   php artisan migrate --seed
   ```

---

## Build and Serve the Application

1. Build assets:
   ```bash
   npm run build
   ```

2. Start the development server:
   ```bash
   php artisan serve
   ```

The application should now be accessible at `http://localhost:8000`.

---

## Troubleshooting
- Ensure your MySQL service is running.
- Double-check the database credentials in your `.env` file.
- If you face issues with migrations, verify that the database exists and is empty.
- For further assistance, refer to the Laravel documentation or contact the project maintainer.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

**Happy Coding!**
