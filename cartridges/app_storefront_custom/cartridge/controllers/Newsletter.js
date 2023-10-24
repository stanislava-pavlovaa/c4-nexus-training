"use strict";

/**
 * @namespace Newsletter
 */

var server = require("server");

var csrfProtection = require("*/cartridge/scripts/middleware/csrf");
var consentTracking = require("*/cartridge/scripts/middleware/consentTracking");

/**
 * Checks if the email value entered is correct format
 * @param {string} email - email string to check if valid
 * @returns {boolean} Whether email is valid
 */
function validateEmail(email) {
    var regex = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
    return regex.test(email);
}

/**
 * Newsletter-Show : The Newsletter-Show endpoint renders the page that allows a shopper to subscribe for newsletter. 
 * @name Base/Newsletter-EditProfile
 * @function
 * @memberof Newsletter
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.generateToken
 * @param {middleware} - userLoggedIn.validateLoggedIn
 * @param {middleware} - consentTracking.consent
 * @param {category} - sensitive
 * @param {renders} - isml
 * @param {serverfunction} - get
 */
server.get(
    "Show",
    server.middleware.https,
    csrfProtection.generateToken,
    consentTracking.consent,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm("newsletter");
        newsletterForm.clear();

        res.render("account/newsletter", {
            newsletterForm: newsletterForm,
        });
        next();
    }
);

/**
 * Newsletter-Save : The Newsletter-Save endpoint is the endpoint that gets hit when a shopper has subscribed for newsletter
 * @name Base/Newsletter-SaveProfile
 * @function
 * @memberof Newsletter
 * @param {middleware} - server.middleware.https
 * @param {middleware} - csrfProtection.validateAjaxRequest
 * @param {httpparameter} - dwfrm_profile_customer_firstname - Input field for the shoppers's first name
 * @param {httpparameter} - dwfrm_profile_customer_lastname - Input field for the shopper's last name
 * @param {httpparameter} - dwfrm_profile_customer_phone - Input field for the shopper's phone number
 * @param {httpparameter} - dwfrm_profile_customer_email - Input field for the shopper's email address
 * @param {httpparameter} - dwfrm_profile_customer_emailconfirm - Input field for the shopper's email address
 * @param {httpparameter} - dwfrm_profile_login_password  - Input field for the shopper's password
 * @param {httpparameter} - csrf_token - hidden input field CSRF token
 * @param {category} - sensititve
 * @param {returns} - json
 * @param {serverfunction} - post
 */
server.post(
    "Save",
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var CustomObjectMgr = require("dw/object/CustomObjectMgr");
        var Resource = require("dw/web/Resource");
        var Transaction = require("dw/system/Transaction");
        var URLUtils = require('dw/web/URLUtils');
        var newsletterForm = server.forms.getForm("newsletter");
        var NEWSLETTER_SUBS_CO = "NEWSLETTER_SUBSCRIPTION";
        
        var newsletterResult = CustomObjectMgr.getCustomObject(
            NEWSLETTER_SUBS_CO,
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
        }
        if (newsletterForm.valid) {
            Transaction.wrap(function () {
                var newsletterEntry = CustomObjectMgr.createCustomObject(
                    NEWSLETTER_SUBS_CO,
                    newsletterForm.email.value
                );
                newsletterEntry.custom.name = newsletterForm.fullname.value;
                newsletterEntry.custom.skinType = newsletterForm.skinType.value;
            });
        }

        res.json({
            success: true,
            redirectUrl: URLUtils.url("Newsletter-Show").toString(),
        });

        return next();
    }
);

module.exports = server.exports();
