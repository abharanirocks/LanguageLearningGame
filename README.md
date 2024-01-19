# Quiz App API

This project is an API for a Quiz App that includes various features such as authentication, quiz functionality, scoring system, progress tracking, and proficiency assessment. Currently, the app only supports the English language and each question can have a difficulty level ranging from 0 to 5.

## Endpoints

The following endpoints have been created to support the different features of the Quiz App:

- `/signup`,`/signin`: This endpoint handles user authentication and authorization.
- `/questions`,`/submit`: This endpoint allows users to access and interact with the quiz functionality.Submit responsible for calculating and managing user scores
- `/profile`: This endpoint tracks and provides information about user progress and proficiency in the quiz.
- `/reset-progress`: This endpoint is used for resetting the user's progress in the quiz.
- `/leaderboard`: This endpoint lists all users with their details and all quizzes they have attended.


## Getting Started

To get started with the Quiz App API, follow these steps:

1. Clone down this repository. 
2. Install the required dependencies: `npm install`
3. Configure the necessary environment variables.
4. Start the server: `npm dev start`


