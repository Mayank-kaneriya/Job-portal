Project Overview
This is a full-stack job portal application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform enables users to register as job seekers or employers, browse/post jobs, apply for jobs, and manage applications. The application features a responsive front-end, secure back-end APIs, and a MongoDB database to handle data storage.

Features
1.User Management: Register/login as a Job Seeker or Employer with JWT-based authentication.
2.Job Management: Employers can post jobs; Job Seekers can browse and apply for jobs.
3.Company Profiles: Companies can create profiles to showcase their details.
4.Application Tracking: Job Seekers can track their application statuses; Employers can review applications.
5.Responsive Design: Built with React.js and shadcn UI for a seamless user experience across devices.

Tech Stack
(a) Frontend: React.js,shadcn UI
(b) Backend: Node.js, Express.js
(c) Database: MongoDB (with Mongoose ODM)
(d) Authentication: JSON Web Tokens (JWT)

=>Prerequisites
Before setting up the project, ensure you have the following installed:
Node.js (v16.x or later)
MongoDB (local instance or MongoDB Atlas)
npm or yarn
A code editor like VS Code

===> Installation and Setup
1. Clone the Repository:
git clone <your-repo-url>
cd job-portal

2. Install Dependencies:
(a) For the backend:
    cd backend
    npm install



(b) For the frontend:
   cd ../frontend
   npm install



3. Configure Environment Variables:
Create a .env file in the backend directory based on .env.example.

Add the following variables:
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret-key>
PORT=5000

4. Run the Application:
    Start the backend server:
    cd backend
    npm run start



5. Start the frontend development server:
    cd frontend
    npm run start

The backend runs on http://localhost:5000, and the frontend runs on http://localhost:3000.

6. Access the Application:
   Open your browser and navigate to http://localhost:3000 to use the job portal.

Project Structure
/backend: Contains Express.js server, routes, controllers, models (User, Job, Company, Application), and middleware.
/frontend: Contains React.js components, pages, and Tailwind CSS for styling.
/models: Mongoose schemas for User, Job, Company, and Application (e.g., User: fullName, email; Job: title, description; etc.).
/routes: API endpoints for authentication, job posting, and application management.

Key Notes
1-> The application uses Mongoose schemas to define data models, ensuring structured data storage in MongoDB.
2-> JWT authentication secures API endpoints, protecting routes like job posting and application submission.
3-> The frontend is styled with Tailwind CSS for a modern, responsive UI.
4-> Error handling is implemented on both frontend and backend for a smooth user experience.
5-> The project follows RESTful API conventions for scalability.

[AI Usage]
This project was developed with assistance from Grok (xAI) for generating code snippets, debugging, and structuring the README.

Future Improvements
-> Add admin dashboard for managing users and jobs.
-> Implement real-time notifications for application updates.
-> Integrate third-party APIs (e.g., job recommendation engines).

Troubleshooting
MongoDB Connection Issues: Ensure your MongoDB URI is correct and the database is running.
ORS Errors: Verify the backend allows requests from http://localhost:3000.
JWT Errors: Check that the JWT_SECRET is correctly set in the .env file.

Contact

For any queries or issues, reach out to Mayank Kaneriya at mayankkaneriya7@gmail.com.
