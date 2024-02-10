const userRouter = require("express").Router();
const User = require("../models/User");

userRouter.post('/register', async(req, res)=>{
    const{username, email,password} = req.body
    try {
        const newUser = new User ( {
            username,
            email,
            password
        })
        await  newUser.save().then(() => {
            res.status(200).json({message: "User added successfully"});
        })
    }catch(error){
        console.log(error);
    }
})


module.exports = userRouter;