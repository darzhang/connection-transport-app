# Connection Transport App

## Overview

Connection Transport App is designed to enhance the daily commute experience by allowing users to create and manage "connections" for transport stops they frequently use. This app enables users to effortlessly create new connections and access detailed information about each, ensuring a smoother and more informed travel experience.

## Features

- **Create Connections:** Users can add new transport stops to their list of connections.
- **View Connection Information:** Users can view detailed information about their connections, including the stop's location and the next three scheduled departures for that stop.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine.

### Prerequisites

- Node.js
- npm
- PostgreSQL
- OpenSSL (for generating NextAuth secret)

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**

   Navigate to the project directory and run:

   ```bash
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file at the project root and add the following configurations:

   - `DATABASE_URL="your_database_connection_string"`: Your PostgreSQL database URL.
   - `SEED_USER_PASSWORD="test1234"`: Mock user password for seeding the database.
   - `NEXTAUTH_SECRET`: Generate this by running `openssl rand -base64 32` in your terminal and copy-pasting the result here.
   - `NEXTAUTH_URL="http://localhost:3000"`: Your application URL.

4. **Database Setup**

   If using a local PostgreSQL instance, set up the database:

   - Run the migration with Prisma:

     ```bash
     npx prisma migrate deploy
     ```

   - Seed the database:

     ```bash
     npx prisma db seed
     ```

5. **Running the Application**

   Start the development server:

   ```bash
   npm run dev
   ```

## Usage

To access the application, navigate to `http://localhost:3000/login` and log in using the following credentials:

- **Email:** `test@gmail.com`
- **Password:** `test1234`
