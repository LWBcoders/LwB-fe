## Learning Without Borders (LwB) - Project README
Welcome to the Learning Without Borders (LwB) project! This repository contains the fronend code for a comprehensive online educational application designed to facilitate communication between teachers and students, provide resources, and enable virtual classrooms. The project includes features such as authentication, teacher and student interfaces, video streaming, real-time messaging, and more.

###Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Setting up Firebase Configuration](#setting-up-firebase-configuration)
- [Contributing](#contributing)
- [License](#license)
- [Backend Repository](#frontend-repository)
- 
Introduction
The Learning Without Borders (LwB) project is an online educational platform aimed at bridging the gap between teachers and students through innovative technology. It provides a seamless interface for teachers to send information, conduct virtual classrooms, and interact with students in real-time. The Frontend of the application is built using ReactJS.

### Features

1. **Authentication**:

   - User authentication using JSON Web Tokens (JWT).
   - Separate routes for teachers and students.

2. **Video Streaming**:

   - Integration with Agora RTC SDK for real-time video streaming.
   - Creation and management of virtual classrooms.

3. **Real-time Messaging**:

   - Integration with Agora RTM SDK for real-time messaging between users.
   - Chat functionality for communication within virtual classrooms.

4. **Resource Management**:
   - Management of subjects, years, quizzes, events, and notes.
  
### Prerequisites

To run the LwB project frontend, ensure you have the following prerequisites installed:

- ReactJs
  
### Installation

To install dependencies, run the following command:

```bash
npm install
```

### Usage
To start the frontend server, run:

```bash
npm run dev
```
The server will start running at the specified port.

### Setting up Firebase configuration
- Sign up on Firebase and create a new project.
- In your Firebase project settings, find the configuration details.
- Replace firebaseConfig object in the firebase.js file with your configurations 
### Contributing

Contributions to enhance the functionality, fix bugs, or improve the user experience are welcome. Feel free to fork the repository, make changes, and submit a pull request.

### License

This project is open-source and available under the MIT License. See the LICENSE file for details.

### Backend Repository

The backend code for the LwB project can be found at [LwB Backend Repository](https://github.com/LWBcoders/sawm2000/LwB-be).
