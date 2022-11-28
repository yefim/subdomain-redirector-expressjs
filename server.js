import express from 'express';
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()
const app = express();

app.get('/', async (req, res) => {
  res.send('redirecting to hello world');
});

app.get('/edit', async (req, res) => {
});

app.post('/edit', async (req, res) => {
});

app.listen(process.env.PORT || 3000);
