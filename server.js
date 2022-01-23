const http = require('http'); // import http(core) module

const hostname = 'localhost'; // set hostname to localhost
const port = 3000; // set the port number to 3000

const path = require('path'); // import path(core) module
const fs = require('fs');  // import fs(core) module

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`); // log out the url and the method used for the reqest

    if (req.method === 'GET') {
        let fileUrl = req.url; // if the request comes in just to the hostname and not hostname/something.html the req url will just be a forward slash
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        }

        // path.resolve converts path from a relative path to a absolute path
        const filePath = path.resolve('./public' + fileUrl);
        const fileExt = path.extname(filePath); // parse 
        if (fileExt === '.html') {
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} is not found</h1></body></html>`);
                    return; // stop code after this from executing
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filePath).pipe(res); // don't load the whole file into memeory, load in small chunks. two streams allow you to pipe one to another
            });
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});
// create a new instance of the Http.Server class
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)});

