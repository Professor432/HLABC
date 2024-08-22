// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

const PORT = 5000;

// Import models
const User = require('./models/User');
const OneToOne = require('./models/OneToOne');
const Fee = require('./models/Fee');
const Meeting = require('./models/Meeting');

// MongoDB connection
const connectdb = async () => {
  try {
    await mongoose.connect('mongodb+srv://mananpatel15124:manan_1512@cluster0.pyiwz.mongodb.net/', {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}
connectdb();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('No token provided.');

  jwt.verify(token.split(' ')[1], 'qwertyuiopasdfghjklzxcvbnm', (err, decoded) => {
    if (err) return res.status(500).send('Failed to authenticate token.');
    req.userId = decoded.id;
    next();
  });
};

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!(email && password)){
      res.status(400).send('Required feilds are empty')
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if(user && (await bcrypt.compare(password, user.password))){
      const token = jwt.sign(
        {id: user._id, email},
        'qwertyuiopasdfghjklzxcvbnm',
        {
          expiresIn: "1h"
        }
      );
      user.token = token
      user.password = undefined

        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
          httpOnly: true
        };
        res.status(200).cookie("token", token, options).json({
          success: true,
          token,
          user
        })
    }
  } catch (error) {
    console.log(error)
  }
});

// Add User route (for form submission)
app.post('/api/adduser', async (req, res) => {
  try {
    const { firstName, lastName, occupation, email, password, retypePassword, role } = req.body;
    console.log(req.body);
    if (password !== retypePassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existingUser = await User.findOne({ email })
    if(existingUser){
      res.status(401).send('User already exists with this email')
    }

    const newUser = new User({ firstName, lastName, occupation, email, password, role });

    const encpass = await bcrypt.hash(password, 10)

    const user = await User.create({
      firstName,
      lastName,
      occupation,
      email,
      password : encpass,
      role
    })

    const token = jwt.sign(
      {id: user._id, email},
      'qwertyuiopasdfghjklzxcvbnm',
      {
        expiresIn: "1h"
      }
    );
    user.token = token
    user.password = undefined
    res.status(201).json(user)

  } catch (error) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

app.post('/api/onetoone', verifyToken, async (req, res) => {
  const { date, metWith, invitedBy, location, topic } = req.body;
  const userId = req.userId; // Get user ID from token

  const newOneToOne = new OneToOne({ date, metWith, invitedBy, location, topic, userId });

  try {
    await newOneToOne.save();
    res.status(201).json({ success: true, message: 'One-to-One slip added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding One-to-One slip' });
  }
});


// Search One-To-One slips based on metWith or invitedBy fields
app.get('/api/onetoone', async (req, res) => {
  const { searchQuery } = req.query;
  let filter = {};

  if (searchQuery) {
    filter = {
      $or: [
        { metWith: { $regex: searchQuery, $options: 'i' } }, // Case insensitive search
        { invitedBy: { $regex: searchQuery, $options: 'i' } },
        { location: { $regex: searchQuery, $options: 'i' } },
        { topic: { $regex: searchQuery, $options: 'i' } }
      ]
    };
  }

  try {
    const entries = await OneToOne.find(filter);
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving One-to-One entries' });
  }
});

// Fetch all users route
app.get('/api/user', async (req, res) => {
  const { searchQuery } = req.query;
  let filter = {};

  if (searchQuery) {
    filter = {
      $or: [
        { firstName: { $regex: searchQuery, $options: 'i' } }, // Case insensitive search
        { lastName: { $regex: searchQuery, $options: 'i' } },
        { occupation: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
        { role: { $regex: searchQuery, $options: 'i' } }
      ]
    };
  }

  try {
    const entries = await User.find(filter);
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving One-to-One entries' });
  }
});

// Update user role route
app.put('/api/user/:email', async (req, res) => {
  const { email } = req.params;
  const { role } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ email }, { role }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ message: 'Server error while updating role' });
  }
});

// Edit Profile
app.put('/api/update-email', async (req, res) => {
  const { currentEmail, newEmail, firstName, lastName, occupation } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email: currentEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.email = newEmail; // Update to the new email
    user.firstName = firstName;
    user.lastName = lastName;
    user.occupation = occupation;

    await user.save();
    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Password
app.put('/api/updatepassword', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error while updating password' });
  }
});

// Add Fee Slip route
app.post('/api/fee', async (req, res) => {
  try {
    const { date, firstName, lastName, amount, status, userId } = req.body;
    // console.log(req.body);

    const newFee = new Fee({ date, firstName, lastName, amount, status, userId });

    await newFee.save();

    res.status(201).json(newFee);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding fee slip' });
  }
});

// Fetch fees by userId route
app.get('/api/fee', async (req, res) => {
  const { userId, searchQuery } = req.query;
  let filter = { userId };

  if (searchQuery) {
    filter = {
      ...filter,
      $or: [
        { firstName: { $regex: searchQuery, $options: 'i' } }, // Case insensitive search
        { lastName: { $regex: searchQuery, $options: 'i' } },
        { amount: { $regex: searchQuery, $options: 'i' } },
        { status: { $regex: searchQuery, $options: 'i' } }
      ]
    };
  }

  try {
    const entries = await Fee.find(filter);
    res.json(entries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving Fee entries' });
  }
});

// Update fee status route
app.put('/api/fee/:userId', async (req, res) => {
  const { userId } = req.params;
  const { index, status } = req.body;

  // Validate the status field
  if (status !== 'Completed' && status !== 'Pending') {
    return res.status(400).json({ message: 'Invalid status value. Must be either "Completed" or "Pending".' });
  }

  try {
    // Replace with your actual data source and model
    const feeData = await Fee.find({ userId });

    // Check if the index is valid
    if (index < 0 || index >= feeData.length) {
      return res.status(400).json({ message: 'Invalid index' });
    }

    // Update the fee status
    const updatedSlip = await Fee.findOneAndUpdate(
      { userId, _id: feeData[index]._id },
      { status },
      { new: true }
    );

    if (!updatedSlip) {
      return res.status(404).json({ message: 'Fee entry not found' });
    }

    res.status(200).json(updatedSlip);
  } catch (error) {
    console.error('Error updating fee status:', error);
    res.status(500).json({ message: 'Server error while updating status' });
  }
});

// Add Meeting route
app.post('/api/meeting', verifyToken, async (req, res) => {
  const { date } = req.body;
  const userId = req.userId; // Get user ID from token

  const newMeeting = new Meeting({ date, userId, attendees: [] });

  try {
    await newMeeting.save();
    res.status(201).json({ success: true, message: 'Meeting added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding meeting' });
  }
});

// Get all meetings
app.get('/api/meetings', verifyToken, async (req, res) => {
  try {
    const meetings = await Meeting.find().populate('attendees.userId');
    res.json(meetings);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving meetings' });
  }
});

// Update attendance
app.put('/api/meeting/:id/attendance', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { userId, attended } = req.body;

  try {
    const meeting = await Meeting.findById(id);
    if (!meeting) {
      return res.status(404).json({ message: 'Meeting not found' });
    }

    const attendeeIndex = meeting.attendees.findIndex(att => att.userId.toString() === userId);
    if (attendeeIndex >= 0) {
      meeting.attendees[attendeeIndex].attended = attended;
    } else {
      meeting.attendees.push({ userId, attended });
    }

    await meeting.save();
    res.status(200).json(meeting);
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});