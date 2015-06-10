var cheerio = require("cheerio");

function parse(body) {

    var $ = cheerio.load(body);

    return $('table#winners-table tbody')
        .find('tr')
        .map(function (index, elem) {
            return {
                name: parseWinnerName(elem),
                announcementId: parseAnnouncementId(elem),
                lotId: parseLotId(elem),
                planningPrice: parsePlanningPrice(elem),
                supplierPrice: parseSupplierPrice(elem)
            }
        }).get();
}

function parseSupplierPrice(elem) {
    return parseFloat(getChild(elem, 5).text().replace(/[^0-9, ]/g, "").replace(",", ".").trim()).toFixed(2)
}

function parsePlanningPrice(elem) {
    return parseFloat(getChild(elem, 4).text().replace(/[^0-9, ]/g, "").replace(",", ".").trim()).toFixed(2)
}
function parseLotId(elem) {
    return getChild(elem, 3).text().trim();
}

function parseWinnerName(elem) {
    return getChild(elem, 1).text().trim();
}

function parseAnnouncementId(elem) {
    return getChild(elem, 2).text().trim();
}

function getChild(el, idx) {
    return cheerio(cheerio(el).children()[idx]);
}

module.exports = {
    parse: parse
};
