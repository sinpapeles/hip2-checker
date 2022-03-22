import express from 'express';
import https from 'https';
import { DANEAgent, setServers, lookup } from 'https-dane';

const agent = new DANEAgent();
type FN = (data: any) => void;

const get = (url: string, resolve: FN, reject: FN, redirect: number = 0) => {
  if (redirect > 5) {
    reject(new Error('Too many redirects'));
    return;
  }
  const req = https.get(url, { agent, lookup }, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302) {
      return get(res.headers.location!, resolve, reject, redirect + 1);
    }

    let data = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => (data += chunk));
    res.on('end', () => {
      if (res.statusCode! >= 400) {
        const error = new Error(res.statusMessage);
        (error as any).code = res.statusCode;

        return reject(error);
      }
      resolve(data.trim());
    });
    req.on('error', (error) => reject(error));
    req.end();
  });
};

function fetchAddress(name: string, token: string = 'HNS') {
  return new Promise((resolve, reject) => {
    const url = `https://${name}/.well-known/wallets/${token.toUpperCase()}`;

    get(url, resolve, reject);
  });
}

setServers([process.env.DNS!]);

const app = express();

app.get('/', (req, res) => {
  const name = req.query.name as string;
  const token = (req.query.token as string) || 'HNS';
  res.header('Access-Control-Allow-Origin', '*');

  fetchAddress(name, token)
    .then((addr) => {
      res.json({ addr });
    })
    .catch(() => {
      res.status(400).json({ addr: false });
    });
});

app.listen(process.env.PORT || 3000);
console.log('🚀 listening...');
