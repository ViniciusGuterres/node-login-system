// Libs
import express from 'express';
import jsonwebtoken from 'jsonwebtoken';

// Files
import settings from './settings';

if (!settings?.jwtAuth) {
  console.log('src/server - Missing settings.jwtAuth')
  return;
}

if (!settings.jwtAuth?.privateKey) {
  console.log('src/server - Missing settings.jwtAuth')
  return;
}

const port = settings.port || 3000;
const jwtExpireTimeout = settings.jwtAuth.expireTimeout || "60m";

// Initializing app
const app = express();
app.use(express.json());

// TODO: add route module out of the server.ts
app.get('/', (_, res) => res.status(200).json({
  message: 'Welcome...',
}));


// TODO: get user and user name from DB
const user = {
  name: 'Vinicius Guterres',
  email: 'vinicius@test.com',
};

app.get('/login', (req, res) => {
  const [, hash] = req.headers.authorization?.split(' ') || [' ', ' '];
  const [email, password] = Buffer.from(hash, 'base64').toString.split(':');

  try {
    // TODO: get the password and email from DB
    const correctPassword = email === 'vinicius@test.com' && password === '123456789';

    if (!correctPassword) {
      return res.status(401).send("Password or E-mail incorrect!");
    }

    // If everything alright with email and password, generate and JWT
    const token = jsonwebtoken.sign(
      { user: JSON.stringify(user) },
      settings.jwtAuth.privateKey,
      { expiresIn: jwtExpireTimeout }
    );
    
    return res.status(200).json({ data: { user, token } });
  } catch (error) {
    console.log('routes/login - error ', error);
    return res.status(500).send(error);
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
