require('dotenv').config();
const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ success: true, message: 'API Lelana Aksara berjalan!' });
});

app.use('/api/game', gameRoutes);

app.listen(PORT, () => {
  console.log(`Server Lelana Aksara berjalan di http://localhost:${PORT}`);
});