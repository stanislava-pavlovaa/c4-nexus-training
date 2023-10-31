"use strict";

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
var pageMetaData = require("*/cartridge/scripts/middleware/pageMetaData");

var store = require("*/cartridge/models/store");

server.get(
    "Show",
    consentTracking.consent,
    cache.applyDefaultCache,
    function (req, res, next) {
        var Site = require("dw/system/Site");
        var storeModel = new store({ storeEvents: "store events text" });

        res.json({ storeModel });

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
