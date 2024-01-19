const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    progress: { 
        type: Number, 
        default: 0 
    },
    proficiency: { 
        type: Number, 
        default: 1 
    },
    languagePreferences: { 
        type: String, 
        default: 'English' 
    },
    completedExercises: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
      score: { type: Number },
    },
  ],
    
});

userSchema.pre('save', function(next){ //obj here is as this. if user ()=> then it will read this file
    const user = this;
    if (!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err);
        }

        bcrypt.hash(user.password, salt,(err,hash)=>{
            if(err){
                return next(err);
            }
            user.password = hash;
            next();
        });
    });

} );

userSchema.methods.comparePassword = function(candPassword){
    const user = this;
    return new Promise((resolve,reject)=>{
        bcrypt.compare(candPassword,user.password,(err, isMatch)=>{
            if(err){
                return reject(err);
            }
            if(!isMatch){
                return reject(false);
            }
            resolve(true);
        } )
    })
}

mongoose.model('User', userSchema);