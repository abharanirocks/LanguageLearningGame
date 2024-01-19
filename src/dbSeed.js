const mongoose = require('mongoose');
const Quiz = mongoose.model('Quiz');


const createTemporaryQuestions = async () => {
  try {
    const quizData = [
      {
        questions: [
          { question: 'Easy Question 1', answer: 'A', difficulty: 0 },
          { question: 'Easy Question 2', answer: 'B', difficulty: 0 },
          { question: 'Easy Question 3', answer: 'C', difficulty: 0 },
          { question: 'Easy Question 4', answer: 'D', difficulty: 0 },
          { question: 'Easy Question 5', answer: 'E', difficulty: 0 },
        ],
      },
      {
        questions: [
          { question: 'Difficult Question 1', answer: 'A', difficulty: 5 },
          { question: 'Difficult Question 2', answer: 'B', difficulty: 5 },
          { question: 'Difficult Question 3', answer: 'C', difficulty: 5 },
          { question: 'Difficult Question 4', answer: 'D', difficulty: 5 },
          { question: 'Difficult Question 5', answer: 'E', difficulty: 5 },
        ],
      },
    ];

    await Quiz.insertMany(quizData);

    console.log('Temporary questions added successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

const checkAndCreateQuestions = async () => {
  try {
    const quizCount = await Quiz.countDocuments();

    if (quizCount === 0) {
      await createTemporaryQuestions();
    }
  } catch (error) {
    console.error('Error checking and creating questions: ', error);
  }
};


module.exports = checkAndCreateQuestions;
