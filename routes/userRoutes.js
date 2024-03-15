const userRouter = require("express").Router();
const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


userRouter.post('/register', async (req, res) => {
    console.log('Registering user');
    const { username, email, password, role } = req.body;
    try {
        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // User with the provided email already exists, throw an error
            return res.status(400).json({ error: "User with this email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // User with the provided email does not exist, proceed to save the new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role
        });

        await newUser.save();
        // Generate JWT token with 7 days validity
        const token = jwt.sign({ userId: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ message: "User added successfully", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


userRouter.post('/login', async (req, res) => {
    console.log('Logging in user');
    const { email, password, role } = req.body;
    try {
        // Check if a user with the provided email exists
        const user = await User.findOne({ email });
        if (!user) {
            // User with the provided email does not exist
            return res.status(404).json({ error: "User not found" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // Password is incorrect
            return res.status(400).json({ error: "Incorrect password" });
        }

        //check the role type
        if (role != user.role) {
            return res.status(400).json({ error: "User not found with given role" });
        }

        // Password is correct, generate JWT token with 7 days validity
        const token = jwt.sign({ userId: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


userRouter.get('/userDetails', async (req, res) => {
    let token = req.header('Authorization');

    token = token.replace('Bearer ', '');


    // Check if token is present in the header
    if (!token) {
        return res.status(401).json({ error: "Invalid header. Token is missing." });
    }

    try {
        // Decode the JWT token
        // console.log("received_token=>" + token);
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user details from the database using the decoded email
        const user = await User.findOne({ email: decodedToken.email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // If user found, respond with a success message
        return res.status(200).json({ message: "User found" });

    } catch (error) {
        console.log(error);
        // If token is invalid or expired
        return res.status(401).json({ error: "Invalid token" });
    }
});


module.exports = userRouter;
