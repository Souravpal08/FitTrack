# FitTrack
FitTrack is a comprehensive fitness management application designed to help users track their workouts and monitor their progress. Built using the MERN stack (MongoDB, Express, React, Node.js) and Create React App (CRA), FitTrack provides users with tools to manage their fitness journey, from logging workouts to viewing detailed analytics.

# Features
1. Workout Tracking
Add Workouts: Easily log your workouts, including details such as type, duration, and intensity.
Calories Burned Calculation: The app calculates the total calories burned for each workout, providing an average as well.
Daily View: View the workouts logged on the current date, allowing for easy tracking and review.
2. Analytics
Weekly Burned Calories: Visualize your weekly progress with bar charts and pie charts that display the total calories burned each day and throughout the week.
Average Calories Burned: Get insights into your performance with an average calculation of calories burned over your logged workouts.
3. Tutorial Page
Health Tips: Access a curated list of tips and advice to help you stay healthy and motivated on your fitness journey.

# Technologies Used
Frontend: React, React Bootstrap
Backend: Node.js, Express
Database: MongoDB
State Management: Redux 

# Installation
Prerequisites
Node.js and npm installed
MongoDB instance running

# Steps
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/fittrack.git
cd fittrack
Install dependencies:

For the backend:
bash
Copy code
cd server
npm install

For the frontend:
bash
Copy code
cd client
npm install

# Setup environment variables:

Create a .env file in the backend directory with the following variables:
makefile
Copy code
MONGO_URI=your_mongodb_connection_string
PORT=8000
Adjust the MONGO_URI to your MongoDB instance.
Run the application:

# Start the backend:
bash
Copy code
cd backend
npm start
# Start the frontend:
bash
Copy code
cd frontend
npm start
The application should now be running locally at http://localhost:3000.

# Usage
Adding Workouts: Navigate to the "Dashboard" section to add and view your daily workouts.
Viewing Analytics: Check the "Workouts" section to see detailed charts of your weekly progress.
Health Tips: Visit the "Tutorial" page for tips on staying healthy and maintaining a balanced fitness routine.
Contributing
Coonection: At the last we have added a simple contact page where we give our current location and other contact details
We welcome contributions to enhance FitTrack! Please follow these steps:

# Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit them (git commit -m 'Add some feature').
Push to the branch (git push origin feature/your-feature).
Create a pull request.

# Author & copyright
This project is under personal of @Sourav Pal. All copyrights are reserved.

# Contact
For questions or inquiries, please contact [www.souravpal2003@gmail.com].
