"use strict";

/**
 * @namespace CustomVariable
 */

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
var pageMetaData = require("*/cartridge/scripts/middleware/pageMetaData");
var userLoggedIn = require("*/cartridge/scripts/middleware/userLoggedIn");

/**
 * Any customization on this endpoint, also requires update for Default-Start endpoint
 */
/**
 * CustomVariable-Show : This endpoint is called when a shopper navigates to the CustomVariable page
 * @name Base/CustomVariable-Show
 * @function
 * @memberof CustomVariable
 * @param {middleware} - consentTracking.consent
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get(
    "Show",
    consentTracking.consent,
    cache.applyDefaultCache,
    function (req, res, next) {
        res.render("showVariable/test");
        next();
    },
    pageMetaData.computedPageMetaData
);

server.get("ErrorNotFound", function (req, res, next) {
    res.setStatusCode(404);
    res.render("error/notFound");
    next();
});

module.exports = server.exports();
