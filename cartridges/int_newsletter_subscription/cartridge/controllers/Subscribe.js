"use strict";

/**
 * @namespace Subscribe
 */

var server = require("server");
var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");

/**
 * Subscribe-Show : The Subscribe-Show endpoint renders the page that allows a shopper to subscribe for newsletter.
 * @name Base/Subscribe-EditProfile
 * @function
 * @memberof Subscribe
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - consentTracking.consent
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get("Show", server.middleware.https, csrfProtection.generateToken, consentTracking.consent,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm("newsletter");
        newsletterForm.clear();

        res.render("subscribe/newsletter", {
            newsletterForm: newsletterForm,
        });
        next();
    }
);

/**
 * Subscribe-Create : The Subscribe-Create endpoint is the endpoint that gets hit when a shopper has subscribed for newsletter
 * @name Base/Subscribe-Create
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post("Create", server.middleware.https, csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var CustomObjectMgr = require("dw/object/CustomObjectMgr");
        var Transaction = require("dw/system/Transaction");
        var Resource = require("dw/web/Resource");
        var URLUtils = require("dw/web/URLUtils");

        var newsletterForm = server.forms.getForm("newsletter");
        var NEWSLETTER = "Newsletter_Subscription";

        var newsletterResult = CustomObjectMgr.getCustomObject(
            NEWSLETTER,
            newsletterForm.email.value
        );

        if (!empty(newsletterResult)) {
            newsletterForm.valid = false;
            newsletterForm.email.valid = false;
            newsletterForm.email.error = Resource.msg(
                "error.message.not.unique",
                "forms",
                null
            );
            res.json({
                success: false,
                errorMessage: Resource.msg('error.message.not.unique', 'forms', null)
            });
        }

        if (newsletterForm.valid) {
            Transaction.wrap(function () {
                var newsletterEntry = CustomObjectMgr.createCustomObject(
                    NEWSLETTER,
                    newsletterForm.email.value
                );
                newsletterEntry.custom.firstName = newsletterForm.firstName.value;
                newsletterEntry.custom.lastName = newsletterForm.lastName.value;
                if (newsletterForm.gender.value) {
                    newsletterEntry.custom.gender = newsletterForm.gender.value;
                }
            });
        }
        res.json({
            success: true,
            redirectUrl: URLUtils.url("Subscribe-Show").toString(),
        });

        return next();
    }
);

module.exports = server.exports();
