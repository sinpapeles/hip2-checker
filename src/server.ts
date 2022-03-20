import express from 'express';
import hip2 from 'hip2-dane';

const app = express();

app.get('/', (req, res) => {
  const name = req.query.name as string;
  const token = (req.query.token as string) || 'HNS';
  res.header('Access-Control-Allow-Origin', '*');

  hip2
    .fetchAddress(name, token)
    .then((addr) => {
      res.json({ addr });
    })
    .catch(() => {
      res.status(400).json({ addr: false });
    });
});

// @ts-ignore
if (import.meta.env.PROD) {
  app.listen(process.env.PORT || 3000);
  console.log('🚀 listening...');
}

export const viteNodeApp = app;
