# credit-simulator

## Description

This project implements a full-stack application for credit applications, allowing users to submit their credit requests and receive simulated offers from financial institutions. The backend is built with **NestJS** and **MongoDB**, while the frontend is developed using **Next.js**. The project also integrates **RabbitMQ** for asynchronous processing of requests, and it is containerized using **Docker**.

## Features

- **Frontend**: A form for users to submit credit applications and view simulated offers.
- **Backend**: Handles the submission of credit requests, stores them in MongoDB, and returns simulated offers.
- **RabbitMQ** (Optional): Used for background processing of credit requests.
- **MongoDB**: Stores credit application data.
- **Docker**: Used to containerize the application.

## Requirements

- **Docker**: For containerizing the backend, frontend, and MongoDB.
- **Node.js**: Version 18 or higher.
- **MongoDB**: Used to store credit applications.

## Getting Started

### 1. Clone the repository

```bash
git clone git@github.com:jouneb/credit-simulator.git
cd credit-simulator
```

### 2. Setup Backend and Frontend with Docker

To start the application with Docker, use the following command:

```bash
docker-compose up --build
```

This will build and start the following services:

- Backend (`NestJS`)
- Frontend (`Next.js`)
- MongoDB
- RabbitMQ (optional, if configured)

### 3. Running the Backend and Frontend Separately

If you want to run the backend and frontend separately, you can do so by following these steps.

#### Backend (NestJS):

1. Navigate to the `backend` directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Run the backend:

```bash
npm run start:dev
```

#### Frontend (Next.js):

1. Navigate to the `frontend` directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the frontend:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

### 4. Connecting to RabbitMQ

If you're using RabbitMQ locally (via Docker), you can access its management interface:

1. **Access the RabbitMQ Management Console**  
   Open your browser and go to `http://localhost:15672`.

2. **Login Credentials**  
   Use the following default credentials to log in:
   - **Username**: `guest`
   - **Password**: `guest`

3. **Monitor RabbitMQ Queues**  
   After logging in, you can view and manage queues, exchanges, and consumers in the RabbitMQ management interface.

4. **Default Queue**  
   The project uses a queue named `creditQueue` to handle credit applications. You can view it in the "Queues" section of the RabbitMQ console.

---