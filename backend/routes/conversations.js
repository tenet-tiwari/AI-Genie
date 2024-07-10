const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const { generateAIResponse, sendEmail } = require('../controllers/aiResponseController');

// Get all conversations
router.get('/', async (req, res) => {
  try {
    const conversations = await Conversation.find();
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a conversation and get AI response
router.post('/', async (req, res) => {
  const { username, email, userMessage } = req.body;
  const aiResponse = await generateAIResponse(userMessage);

  const newConversation = new Conversation({
    username,
    email,
    userMessage,
    aiResponse,
  });

  try {
    const savedConversation = await newConversation.save();
    await sendEmail(email, aiResponse);
    res.status(201).json(savedConversation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
