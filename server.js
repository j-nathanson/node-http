// import the core http module from Node.js to allow Node.js to transfer data over Hyper Text Transfer Protocol (HTTP).
const http = require('http');

// set hostname and port number
// domain name assigned to a host computer
const hostname = 'localhost';
const port = 3000;

// A path is a string of characters used to uniquely identify a location in a directory structure
const path = require('path');
// js file system module allows you to work with the file system on your computer
const fs = require('fs');

// The http.createServer() method turns your computer into an HTTP server, by creating a server object
//Request Header: This type of headers contains information about the fetched request by the client.
// set status code to 200 which is ok
// set the response header with a name and value
// Calling the writable.end() method signals that no more data will be written to the Writable. The optional chunk and encoding arguments allow one final additional chunk of data to be written immediately before closing the stream.


const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    // Check for GET request
    if (req.method === 'GET') {
        // get the requested file location (homepage or specific page)
        let fileUrl = req.url;
        // no specification send to the index page
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }

        // convert from relative path to absolute path
        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath);

        // Check file extension for html
        if (fileExt === '.html') {
            // check if file exist on the server
            fs.access(filePath, err => {
                if (err) {
                    // return an error if file doesn't exist.
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                }
                // GET request, for HTML file that actually exists on the server
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');

                // read contents of file into small chunks(similar to lazy loading) then send to response object
                // response stream can access file
                fs.createReadStream(filePath).pipe(res);
            });
            // if not an html file extension
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
        // if not a GET request
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

// start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});