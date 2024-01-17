// Libs
import express from 'express';

// Files
import settings from './settings';

const port = settings.port || 3000;

// Initializing app
const app = express();
app.use(express.json());

// TODO add route module out of the server.ts
app.get('/', (_, res) => res.status(200).json({
  message: 'Welcome...',
}));

app.get('/login', (req, res) => {
  const [, hash] = req.headers.authorization?.split(' ') || [' ', ' '];
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
