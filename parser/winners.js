var requester = require("../parser/requester");
var winnersParser = require("./winners-parser");
var writer = require("../writer/index");

var PAGE_COUNT = 134;

parsePages(1);

function parsePages(page) {
    if (page <= PAGE_COUNT) parsePage(page, function () {
        parsePages(page + 1);
    });
    else console.log('\nDone');
}

function parsePage(page, cb) {

    var form = {
        rowCount: 200,
        page: page
    };

    requester.post("http://zakupki.okmot.kg", "/pub/winners.action", form, function (err, body) {
        if (!err) {
            writer("winners.csv", arrayOfObjToTsv(arrMap(winnersParser.parse(body))).concat("\n"), function (err) {
                process.stdout.write("\rPage:" + page);
                cb(err);
            });
        }
    });
}


function arrMap(arr) {
    return arr.map(objToArray);
}

function objToArray(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    })
}

function arrToTsv(arr) {
    return arr.join('\t')
}

function arrayOfObjToTsv(arr) {
    return arr.map(arrToTsv).join('\n');
}
