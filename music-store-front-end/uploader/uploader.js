var express = require('express');
var app = express();
var formidable = require('formidable');
var fs = require('fs');

app.post('/api/upload', function (req, res){
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('file', function (name, file) {
        var oldPath = file.path;
        var newPath = '/var/www/html/node/music-store-front-end/music-store/src/assets/img/albums/' + file.name;
        fs.rename(oldPath, newPath, function (err) {
            console.log('File uploaded and moved!');
        });
    })
    
}).listen(3000);

app.post('/api/delete', function (req, res){
    var form = new formidable.IncomingForm();
    form.parse(req);
    form.on('file', function(name, file) {
        var path = '/var/www/html/node/music-store-front-end/music-store/src/assets/img/albums/' + file.name;
        fs.unlink(path, function (err) {
            console.log('File deleted');
        });
    }) 
}).listen(3001);