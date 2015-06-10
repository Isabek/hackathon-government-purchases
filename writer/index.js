var fs = require('fs');

function writer(file, text, cb) {
    fs.appendFile(file, text, function (err) {
        cb(err);
    });
}

module.exports = writer;
