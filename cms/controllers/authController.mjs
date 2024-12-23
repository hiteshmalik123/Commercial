import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../model/user.mjs';

// Signup function
export const signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: 'Username or email already exists' });  // Change 401 to 409 (Conflict)

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();

        res.status(201).send('User registered successfully');
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
};

// Login function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Wrong credentials');
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Wrong password');  // Simplify error message
        }

        // Create JWT token
        const payload = { userId: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Token generated successfully');
        res.status(200).send({ token });  // Changed status code to 200 for successful login
    } catch (error) {
        console.log(error);
        res.status(500).send('No token generated');
    }
};
