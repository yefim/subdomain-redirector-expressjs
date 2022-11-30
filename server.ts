import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', async (req, res) => {
  const link = await prisma.shortLink.findUnique({
    where: {
      host: req.hostname,
    },
  });

  if (link) {
    // log the hit
    await prisma.hit.create({data: {
      ipAddr: '0.0.0.0',
      userAgent: req.headers['user-agent'] || '',
      shortLinkId: link.id,
    }});

    res.send(`redirecting to ${link.redirectUrl}`);
  } else {
    res.send(`link does not exist for ${req.hostname}`);
  }
});

app.get('/count', async (req, res) => {
  const link = await prisma.shortLink.findUnique({
    where: {
      host: req.hostname,
    },
  });

  const hits = link ? await prisma.hit.count({
    where: {
      shortLinkId: link.id,
    }
  }) : 0;

  console.log(hits);

  res.send('' + hits);
});

app.get('/edit', async (req, res) => {
  const link = await prisma.shortLink.findUnique({
    where: {
      host: req.hostname,
    },
  });

  res.send(`<form method="post" action="" onsubmit="navigator.clipboard.writeText('https://' + window.location.host)">
      <label>Redirect URL
        <input type="text" name="redirectUrl" value="${link && link.redirectUrl || ''}">
      </label>
      <label>Password
        <input type="password" name="password">
      </label>
      <button type="submit">Submit</button>
    </form>`);
});

app.post('/edit', async (req, res) => {
  const hostname = req.hostname;
  const {
    redirectUrl,
    password,
  } = req.body;

  if (redirectUrl && password === 'TESTING') {
    const link = await prisma.shortLink.upsert({
      where: {
        host: hostname,
      },
      update: { redirectUrl },
      create: {
        host: hostname,
        redirectUrl,
      },
    });

    res.redirect(link.redirectUrl);
  } else {
    res.send('wrong password');
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on ${process.env.PORT || 3000}...`);
});
