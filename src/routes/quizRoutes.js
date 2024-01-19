const express = require('express')
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth')
const Quiz = mongoose.model('Quiz')
const User = mongoose.model('User')

const router = express.Router();


router.use(requireAuth);

router.get('/questions', async (req, res) => {
    try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'Unauthorized Access' });
      
    }

    const difficulty = user.proficiency > 3 ? 5 : 0; 

    // const questions = await Quiz.find({ difficulty }).limit(5);
    const quiz = await Quiz.findOne({ difficulty }).limit(1);

    if (!quiz) {
      return res.status(404).json({ message: 'No quiz found for the specified difficulty' });
    }

    const questions = quiz.questions.slice(0, 5);
    res.json({ questions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// router.post('/submit', async (req, res) => {
//   try {
//     const { quizId, userAnswer } = req.body;
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: 'Unauthorized Access' });
//     }

//     const quiz = await Quiz.findById(quizId);

//     if (!quiz) {
//       return res.status(404).json({ message: 'Quiz not found' });
//     }

//     let score = 0;

//     const question = quiz.questions.find((q) => q._id.toString() === quizId);

//     if (!question) {
//       return res.status(404).json({ message: 'Question not found in the quiz' });
//     }

//     if (userAnswer.toLowerCase() === quiz.answer.toLowerCase()) {
//         score = quiz.difficulty === 0 ? 1 : quiz.difficulty;
//     }

//     user.progress += score;
//     if (user.progress >= 100) {
//       user.proficiency += 1;
//       user.progress = 0; 
//     }

//     user.completedExercises.push({
//       quizId,
//       score,
//     });

//     await user.save();

//     res.json({ message: 'Answer submitted successfully', score, userProgress: user.progress });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }});

router.post('/submit', async (req, res) => {
  try {
    const { quizId, userAnswers } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'Unauthorized Access' });
    }

    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    let totalScore = 0;

    for (const { questionId, answer } of userAnswers) {
      const question = quiz.questions.find(q => q._id.toString() === questionId);

      if (!question) {
        return res.status(404).json({ message: 'Question not found in the quiz' });
      }
     console.log("Answer",answer,"Question ans",question.answer)
      if (answer.toLowerCase() === question.answer.toLowerCase()) {
        totalScore += question.difficulty === 0 ? 1 : question.difficulty;
      }
    }

    console.log("Total score",totalScore)
    console.log("Progress",user.progress )

    user.progress += totalScore;

    if (user.progress >= 100) {
      user.proficiency += 1;
      user.progress = 0;
    }

    user.completedExercises.push({
      quizId,
      score: totalScore,
    });

    await user.save();

    res.json({ message: 'Answers submitted successfully', totalScore, userProgress: user.progress });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;