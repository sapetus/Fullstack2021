import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
//eslint-disable-next-line
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});