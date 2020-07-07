// bootstrap node.js code from https://nodejs.org/en/docs/guides/getting-started-guide/
// async code from `got`'s starter code from https://www.npmjs.com/package/got 

const http = require('http');
const got = require('got'); // apparently `request` is being deprecated, so I'm going off newer docs

// Not sure if this is the place for this, but this is my first attempt at node.js in over a year since dabbling in it. Will refactor.
(async () => {
    try {
        const response = await got('https://xkcd.com/614/info.0.json');
        console.log(response.body);
        //=> '<!doctype html> ...'
    } catch (error) {
        console.log(error.response.body);
        //=> 'Internal server error ...'
    }
})();

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});