"use strict";

/**
 * @namespace DeathStar
 */

var server = require("server");

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
        var deathStar = JSON.parse(deathStarService.getDeathStar());

        res.render("deathstar", {
            deathStar: deathStar,
        });

        next();
    }
);

module.exports = server.exports();
