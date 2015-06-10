var request = require("request");

function post(baseUrl, uri, form, cb) {
    var options = {
        baseUrl: baseUrl,
        uri: uri,
        method: "POST",
        form: form
    };

    request(options, function (err, res, body) {
        if (err) {
            return cb(err);
        }

        return cb(null, body);
    });
}


module.exports = {
    post: post
};

