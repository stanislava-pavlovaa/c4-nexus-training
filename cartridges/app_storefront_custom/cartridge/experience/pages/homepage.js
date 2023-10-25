"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

/**
 * Render logic for the page
 */

module.exports.render = function (context) {
    var model = new HashMap();

    return new Template("experience/pages/homepage").render(model).text;
};
