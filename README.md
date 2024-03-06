# Hotel Room Booking Project

This project is a hotel room booking application where users can view available bookings, check room availability, and make reservations. It consists of both front end and back end components, utilizing Node.js, React, PostgreSQL, RESTful API, and various design and security elements.

## Technologies Used

### Front End
- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework that provides pre-designed components following the Material Design guidelines.
- **JWT (JSON Web Tokens)**: Used for secure authentication and authorization of users.

### Back End
- **Node.js**: A JavaScript runtime environment for server-side development.
- **Express.js**: A web application framework for Node.js used for building RESTful APIs.
- **PostgreSQL**: A powerful, open-source relational database system.
- **RESTful API**: Used for communication between the front end and back end, following REST architectural principles.

### Deployment and Infrastructure
- **Amazon Web Services (AWS)**: Cloud computing platform for hosting the application.
- **Terraform**: Infrastructure as code tool used for provisioning and managing AWS resources.
- **Docker**: Containerization platform for packaging the application and its dependencies.

## Features
- **Booking Management**: Users can view available bookings and make reservations.
- **Room Availability**: Real-time checking of room availability.
- **JWT Authentication**: Secure authentication mechanism using JSON Web Tokens.
- **Responsive Design**: Utilizes Material-UI for a responsive and visually appealing design across devices.

## Deployment
The application is deployed on Amazon Web Services (AWS) using the following steps:
1. **Infrastructure Setup**: Use Terraform to provision necessary AWS resources such as EC2 instances, RDS (Relational Database Service), and load balancers.
2. **Docker Containerization**: Containerize the application using Docker for easy deployment and scalability.
3. **Continuous Integration/Continuous Deployment (CI/CD)**: Implement CI/CD pipelines to automate the build, test, and deployment processes.
4. **Monitoring and Logging**: Utilize AWS CloudWatch for monitoring application performance and logging.

## Setup Instructions
To set up the project locally, follow these steps:
1. Clone the repository.
2. Install dependencies for both the front end and back end components.
3. Set up the PostgreSQL database and configure connection settings.
4. Run the back end server.
5. Run the front end application.
6. Access the application via the provided URL.
