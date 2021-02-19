const express = require('express');
const path = require('path');
// const event = require('./controllers/event.js');

const app = express();
const PORT = 3002;

app.use('/', express.static(path.join(__dirname, '../public')));

// app.get('/api/events', event);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
