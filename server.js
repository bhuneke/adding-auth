const app = require('./lib/app');
const http = require('http');

require('./lib/connection');

const server = http.createServer(app);

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log('Server is running on:', server.address());
});