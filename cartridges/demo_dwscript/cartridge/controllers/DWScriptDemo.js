"use strict";

/**
 * @namespace DWScriptDemo
 */

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
var pageMetaData = require("*/cartridge/scripts/middleware/pageMetaData");
var DWScriptModel = require("*/cartridge/models/dwscript");

/**
 * DWScriptDemo-Show : This endpoint is called when we have a demo
 * @name Base/DWScriptDemo-Show
 * @function
 * @memberof DWScriptDemo
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
        var PageMgr = require('dw/experience/PageMgr');
        var pageMetaHelper = require("*/cartridge/scripts/helpers/pageMetaHelper");
      
        pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);
        
        var dwScriptModel = new DWScriptModel(customer); // customer is from global properties

        res.render("dwscriptdemo", dwScriptModel);
 
        next();
    },
    pageMetaData.computedPageMetaData
);

module.exports = server.exports();
