import express from 'express';
import hip2 from 'hip2-dane';

hip2.setServers(process.env.DNS!?.split(','));

const app = express();

// public folder
app.use(express.static('./'));

app.get('/api', (req, res) => {
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

app.listen(process.env.PORT || 3000);
console.log('🚀 listening...');
