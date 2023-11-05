"use strict";

/**
 * @namespace ContentAssets
 */

var server = require("server");
var cache = require("*/cartridge/scripts/middleware/cache");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");
var pageMetaData = require("*/cartridge/scripts/middleware/pageMetaData");

/**
 * Function to retrieve asset body and replace placeholders
 * @param {string} assetName - The name of the content asset.
 * @param {string} placeholderValue - The value to replace the placeholder with.
 * @returns {string} - The asset body with placeholders replaced.
 */
function getAssetBody(assetName, placeholderValue) {
    var ContentMgr = require("dw/content/ContentMgr");
    var asset = ContentMgr.getContent(assetName);
    var assetBody = asset ? asset.custom.body : '';
    return assetBody.toString().replace("{0}", placeholderValue);
}

/**
 * ContentAssets-Show : This end point will render a content asset in full storefront ContentAssets
 * @name Base/ContentAssets-Show
 * @function
 * @memberof ContentAssets
 * @param {middleware} - cache.applyDefaultCache
 * @param {middleware} - consentTracking.consent
 * @param {querystringparameter} - cid - the id of the content asset to be displayed in a full ContentAssets
 * @param {category} - non-sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */

server.get(
    "Show",
    cache.applyDefaultCache,
    consentTracking.consent,
    function (req, res, next) {
        var ContentMgr = require("dw/content/ContentMgr");
        var Logger = require("dw/system/Logger");
        var PageMgr = require("dw/experience/PageMgr");
        var ContentModel = require("*/cartridge/models/content");
        var pageMetaHelper = require("*/cartridge/scripts/helpers/pageMetaHelper");
        var page = PageMgr.getPage(req.querystring.cid);

        var currentCustomer = req.currentCustomer.raw;
        var assetBody;

        if (page != null && page.isVisible()) {
            if (!page.hasVisibilityRules()) {
                res.cachePeriod = 168; // eslint-disable-line no-param-reassign
                res.cachePeriodUnit = "hours"; // eslint-disable-line no-param-reassign
            }

            res.page(page.ID, {});
        } else {
            var apiContent = ContentMgr.getContent(req.querystring.cid);

            if (apiContent) {
                var content = new ContentModel(apiContent, "content/assetsPage");
                pageMetaHelper.setPageMetaData(req.pageMetaData, content);
                pageMetaHelper.setPageMetaTags(req.pageMetaData, content);

                if (currentCustomer.getProfile()) {
                    assetBody = getAssetBody('logged-users', currentCustomer.getProfile().firstName);
                } else {
                    assetBody = getAssetBody('guest-users-content', 'Guest');
                }

                if (content.template) {
                    res.render(content.template, { assetBody });
                } else {
                    Logger.warn(
                        "Content asset with ID {0} is offline",
                        req.querystring.cid
                    );

                    res.render("/components/content/offlineContent");
                }
            } else {
                Logger.warn(
                    "Content asset with ID {0} was included but not found",
                    req.querystring.cid
                );
            }
        }

        next();
    },
    pageMetaData.computedPageMetaData
);

module.exports = server.exports();
