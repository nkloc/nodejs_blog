import http from 'http';

const server = http.createServer((req, res) => {
    res.end('Server is running');
});

server.listen(3000);