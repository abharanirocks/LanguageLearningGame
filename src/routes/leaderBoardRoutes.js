const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth')
const router = express.Router();
const User = mongoose.model('User')

router.use(requireAuth);


router.get('/leaderboard', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'Unauthorized Access' });
    }
    const leaderboard = await User.find()
      .sort({ proficiency: -1, progress: -1 })
      .limit(10)
      .select('email progress proficiency languagePreferences completedExercises');
 

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/language/:language', async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'Unauthorized Access' });
    }
    const leaderboard = await User.find({ languagePreferences: req.params.language })
      .sort({ proficiency: -1, progress: -1 })
      .limit(10); 

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
