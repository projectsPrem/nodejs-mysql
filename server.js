const http = require('http');
const fs = require('fs');
const con = require('./DBConnection');
const { connect } = require('http2');

//CreateServer function
var server = http.createServer((req, res) => {


    if (req.method == 'GET' && req.url == '/') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream('./index.html').pipe(res);

    }
    else if (req.method == 'GET' && req.url == '/styles/indexstyle.css') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        fs.createReadStream('./styles/indexstyle.css').pipe(res);
    }


    else if (req.method == 'GET' && req.url == '/function.js') {
        res.writeHead(200, { "Content-Type": "text/javascript" });
        fs.createReadStream("./function.js").pipe(res);

    }// "/funciton.js"

    else if (req.method == 'GET' && req.url == '/home') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        const connect = con.getConnection();
        connect.query('SELECT * FROM comments.comments', function (err, result, field) {
            if (err) {
                throw err;
            }

            var comments = JSON.stringify(result)//convert the json objects to string
            res.end(comments);//sending result to the frontend as a response
        }) // "/home"
    }

    //"/insert"
    else if (req.method == 'POST' && req.url == '/insert') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain')

        var content = '';
        req.on('data', function (data) {
            content += data;

            var obj = JSON.parse(content);

            var connect = con.getConnection();
            connect.query('INSERT INTO comments.comments (comments.userName,comments.comment) VALUES (?,?)', [obj.name,obj.message], function (err, result, field) {
                if (err) {
                    throw err;
                }
                console.log('success!');
                res.end();//
            })//connect Query
            connect.end();
        })
    }//"/insert"
})//CreateServerFucntion()


server.listen(3060, () => {
    console.log("listening");
});