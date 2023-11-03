"use strict";

var server = require("server");

/**
 * Example a
 */
server.get("ShowA", function (req, res, next) {
    res.render('exampleA');
    next();
});

/**
 * Example b
 */
server.get("ShowB", function (req, res, next) {
    res.render('exampleB');
    next();
});

module.exports = server.exports();
