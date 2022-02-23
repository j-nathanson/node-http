// import the core http module from Node.js to allow Node.js to transfer data over Hyper Text Transfer Protocol (HTTP).
const http = require('http');

// set hostname and port number
// domain name assigned to a host computer
const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');

// The http.createServer() method turns your computer into an HTTP server, by creating a server object
//Request Header: This type of headers contains information about the fetched request by the client.
// set status code to 200 which is ok
// set the response header with a name and value
// Calling the writable.end() method signals that no more data will be written to the Writable. The optional chunk and encoding arguments allow one final additional chunk of data to be written immediately before closing the stream.

// currently server will give the same response for every type of request
const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello World!</h1></body></html>');
});

// start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});