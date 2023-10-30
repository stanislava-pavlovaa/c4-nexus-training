"use strict";

/**
 * @namespace Cat
 */

var server = require("server");

var cache = require("*/cartridge/scripts/middleware/cache");

/**
 * Cat-Fact : Used to retrieve a cat fact
 * @name Cat-Fact
 * @param {middleware} - server.middleware.include
 */
server.get(
    "Fact",
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {
        var httpClient = new dw.net.HTTPClient();
        httpClient.open("GET", "https://catfact.ninja/fact");
        httpClient.send();

        var catFact = JSON.parse(httpClient.text);

        res.render("cat", {
            catFact: catFact,
        });

        next();
    }
);

module.exports = server.exports();
