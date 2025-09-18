

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const DB_PATH = path.join(__dirname, 'database.json');
const ADMIN_PASSWORD = 'secureadmin';

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Initialize database file if it doesn't exist
if (!fs.existsSync(DB_PATH)) {
  fs.writeFileSync(DB_PATH, JSON.stringify([]));
}

// POST route to handle contact form submission
app.post('/api/contact', (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const newEntry = {
    name,
    email,
    subject,
    message,
    timestamp: new Date().toISOString()
  };

  try {
    console.log('Received:', newEntry); // log the received data
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8') || '[]');
    data.push(newEntry);
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    // Redirect to thanks.html after successful submission
    res.redirect('/thanks.html');
  } catch (err) {
    console.error('Write error:', err); // log the error
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// GET route to retrieve all messages (example for frontend fetch display)
app.get('/api/messages', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read messages' });
  }
});

// Admin GET route for all messages with password protection
app.get('/api/admin/messages', (req, res) => {
  const { password } = req.query;
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read messages' });
  }
});

// PATCH route to allow admin to respond to a message
app.patch('/api/messages/:timestamp', (req, res) => {
  const { timestamp } = req.params;
  const { password, response } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    const index = data.findIndex(msg => msg.timestamp === timestamp);
    if (index === -1) return res.status(404).json({ error: 'Message not found' });
    data[index].response = response;
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// DELETE route to allow admin to remove a message
app.delete('/api/messages/:timestamp', (req, res) => {
  const { timestamp } = req.params;
  const { password } = req.query;
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  try {
    let data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    data = data.filter(msg => msg.timestamp !== timestamp);
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});