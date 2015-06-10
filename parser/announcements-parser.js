var cheerio = require("cheerio");

function parse(body) {

    var $ = cheerio.load(body);

    return $('table#dispTable tbody')
        .find('tr')
        .map(function (index, elem) {
            return {
                number: parseAnnouncementNumber(elem),
                organization: parseOrganization(elem),
                purchaseName: parsePurchaseName(elem),
                planningPrice: parsePlanningPrice(elem),
                lotCount: parseLotCount(elem),
                purchaseMethod: parsePurchaseMethod(elem),
                publishDate: parsePublishDate(elem),
                deadline: parseDeadline(elem),
                status: parseStatus(elem),
                protocol: parseProtocol()
            }
        }).get();
}


function parseAnnouncementNumber(elem) {
    return getChild(elem, 1).text().trim();
}

function parseOrganization(elem) {
    return getChild(elem, 2).text().trim();
}

function parsePurchaseName(elem) {
    return getChild(elem, 3).text().trim();
}

function parsePlanningPrice(elem) {
    return parseFloat(getChild(elem, 4).text().replace(/[^0-9, ]/g, "").replace(",", ".").trim()).toFixed(2)
}


function parseLotCount(elem) {
    return getChild(elem, 5).text().replace(/[^0-9, ]/g, "").trim();
}


function parsePurchaseMethod(elem) {
    return getChild(elem, 6).text().trim();
}


function parsePublishDate(elem) {
    return getChild(elem, 7).text().trim();
}


function parseDeadline(elem) {
    return getChild(elem, 8).text().trim();
}


function parseStatus(elem) {
    return getChild(elem, 9).text().trim();
}

function parseProtocol(elem) {
    return getChild(elem, 10).text().trim();
}


function getChild(el, idx) {
    return cheerio(cheerio(el).children()[idx]);
}

module.exports = {
    parse: parse
};
