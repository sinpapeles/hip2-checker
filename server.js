const http = require('http');
const hip2 = require('hip2-dane');

hip2.setServers([process.env.DNS]);

const requestListener = (req, res) => {
  const { searchParams } = new URL(req.url, 'http://localhost:8080');
  const name = searchParams.get('name');
  const token = searchParams.get('token') || 'HNS';
  res.setHeader('Access-Control-Allow-Origin', '*');

  hip2
    .fetchAddress(name, token)
    .then((addr) => {
      res.writeHead(200);
      res.end(JSON.stringify({ addr }));
    })
    .catch((e) => {
      res.writeHead(400);
      res.end(JSON.stringify({ addr: false }));
    });
};

const server = http.createServer(requestListener);
server.listen(process.env.PORT || 3000);
