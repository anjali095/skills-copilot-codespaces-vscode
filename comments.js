//create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];
var server = http.createServer(function (request, response) {
    var urlObj = url.parse(request.url, true);
    var urlPathName = urlObj.pathname;
    if (urlPathName === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), function (err, data) {
            if (err) {
                response.end('404 Not Found.');
            } else {
                response.end(data);
            }
        });
    } else if (urlPathName === '/post') {
        fs.readFile(path.join(__dirname, 'post.html'), function (err, data) {
            if (err) {
                response.end('404 Not Found.');
            } else {
                response.end(data);
            }
        });
    } else if (urlPathName === '/comment') {
        var comment = urlObj.query;
        comments.push(comment);
        response.end(JSON.stringify(comments));
    } else {
        fs.readFile(path.join(__dirname, urlPathName), function (err, data) {
            if (err) {
                response.end('404 Not Found.');
            } else {
                response.end(data);
            }
        });
    }
});
server.listen(3000, function () {
    console.log('server is listening at port 3000');
});