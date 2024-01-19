const express = require('express')
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth')
const User = mongoose.model('User')

const router = express.Router();


router.use(requireAuth);



router.get('/profile', async(req,res)=>{
    try {
    const user = await User.findById(req.user._id); // Assuming you have user data in the request

    if (!user) {
      return res.status(404).json({ message: 'Unauthorized Access' });
    }

    const userProfile = {
      username: user.username,
      progress: user.progress,
      proficiency: user.proficiency,
      languagePreferences: user.languagePreferences,
      completedExercises: user.completedExercises,

    };

    res.json(userProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})


router.post('/reset-progress', async(req,res)=>{
    try {
    const user = await User.findById(req.user._id ); 

    if (!user) {
      return res.status(404).json({ message: 'Unauthorized Access' });
    }

    // Reset progress and proficiency levels
    user.progress = 0;
    user.proficiency = 1;
    await user.save();

    res.json({ message: 'Progress reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})

module.exports = router;