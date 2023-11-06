"use strict";

/**
 * @namespace DeathStar
 */

var server = require("server");
var Site = require("dw/system/Site");
var cache = require("*/cartridge/scripts/middleware/cache");
var deathStarService = require("*/cartridge/scripts/deathStarService.js");

/**
 * DeathStar-Info : Used to retrieve a DeathStar info
 * @name DeathStar-Info
 * @param {middleware} - server.middleware.include
 */
server.get(
    "Info",
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {
        var site = Site.getCurrent();
        var swapiPreferenceValue = site.getCustomPreferenceValue("enableSWAPI");

        if (swapiPreferenceValue) {
            var deathStar = JSON.parse(deathStarService.getDeathStar());
            res.render("deathstar", {
                deathStar: deathStar
            });
        }

        next();
    }
);

module.exports = server.exports();
