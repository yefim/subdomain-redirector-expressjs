import express from 'express';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express();

app.get('/', async (req, res) => {
  const link = await prisma.shortLink.findUnique({
    where: {
      host: req.hostname,
    },
  });

  if (link) {
    res.redirect(link.redirectUrl);
  } else {
    res.send(`link does not exist for ${req.hostname}`);
  }
});

app.get('/edit', async (req, res) => {
  const link = await prisma.shortLink.create({
    data: {
      host: req.hostname,
      redirectUrl: 'https://google.com',
    },
  });

  res.send(`you are editing ${req.hostname}`);
});

app.post('/edit', async (req, res) => {
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening...');
});
