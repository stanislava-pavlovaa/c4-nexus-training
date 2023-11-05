"use strict";

/**
 * @namespace ContentSlots
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
 * ContentSlots-Show : This endpoint is called when a shopper navigates to the ContentSlots page
 * @name Base/ContentSlots-Show
 * @function
 * @memberof ContentSlots
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
        var Site = require("dw/system/Site");
        var PageMgr = require("dw/experience/PageMgr");
        var pageMetaHelper = require("*/cartridge/scripts/helpers/pageMetaHelper");

        pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

        res.render("content/slotsPage");

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
