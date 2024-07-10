import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Paper, createMuiTheme, ThemeProvider } from '@material-ui/core';
import './index.css';

// Dark theme
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/conversations', { username, email, userMessage });
      setAiResponse(response.data);
    } catch (error) {
      console.error('Error fetching AI response:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="root">
        <Container maxWidth="sm">
          <Paper className="paper">
            <Typography variant="h4" gutterBottom>
              Auto Reply System
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                className="input"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff' },
                }}
              />
              <TextField
                className="input"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff' },
                }}
              />
              <TextField
                className="input"
                label="Message"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                fullWidth
                required
                multiline
                rows={4}
                margin="normal"
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff' },
                }}
              />
              <Button type="submit" variant="contained" className="button">
                Send
              </Button>
            </form>
            {aiResponse && (
              <div style={{ marginTop: '20px' }}>
                <Typography variant="h6" className="typing-effect">AI Response:</Typography>
                <Typography variant="body1">{aiResponse.aiResponse}</Typography>
              </div>
            )}
          </Paper>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
