const axios = require('axios');
const nodemailer = require('nodemailer');

const generateAIResponse = async (message) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: message,
      max_tokens: 50,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error('AI response error:', error);
    return 'Sorry, I am unable to generate a response at the moment.';
  }
};

const sendEmail = async (email, aiResponse) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Auto Reply from AI',
    text: aiResponse,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = { generateAIResponse, sendEmail };
