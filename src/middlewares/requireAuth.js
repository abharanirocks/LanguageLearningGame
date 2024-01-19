const jwt = require('jsonwebtoken');
const mongoose= require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) =>{
    const { authorization } = req.headers; //express turn everything to lowercase

    if(!authorization){
        return res.status(401).send({error:'You must be logged in.'})
    }

    const token = authorization.replace('Bearer ','');
    jwt.verify(token, 'secretkeyy@#', async(err,payload)=>{
        if(err){
            return res.status(401).send({error:'You must be logged in.'})
        }

        const {userId} = payload;
        const user = await User.findById(userId);
        req.user = user; //assigning to req so that it can access user to other routes
        next();

    })

};