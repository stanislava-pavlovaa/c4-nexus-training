"use strict";

var Template = require("dw/util/Template");
var HashMap = require("dw/util/HashMap");

/**
 * Render logic for the component
 */

module.exports.render = function (context) {
    var model = new HashMap();

    model.src = context.content.src;
    model.title = context.content.title;
    model.height = context.content.height;
    model.width = context.content.width;
    
    return new Template("experience/components/commerce_assets/youtubePlayer").render(model).text;
};
