"use strict";

var server = require("server");
var Transaction = require("dw/system/Transaction");
var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var UUIDUtils = require("dw/util/UUIDUtils");

/**
 * Create Custom Object
 */

server.post("Create", server.middleware.https, function (req, res, next) {
    var form = req.form;
    var error = false;

    if (!form) {
        error = true;
    }

    var type = "Newsletter_Subscription";
    var keyValue = UUIDUtils.createUUID();

    try {
        Transaction.wrap(function () {
            if (!form.email || !form.firstName || !form.lastName) {
                error = true;
            } else {
                var newsletter = CustomObjectMgr.createCustomObject(type, keyValue);
                newsletter.custom.email = form.email;
                newsletter.custom.firstName = form.firstName;
                newsletter.custom.lastName = form.lastName;
                if (form.gender) {
                    newsletter.custom.gender = form.gender;
                }
            }
        });
    } catch (error) {
        error = true;
    }

    if (error) {
        res.json({ error: true });
    } else {
        res.json({
            id: keyValue,
            error: false,
        });
    }
    return next();
});

/**
 * Delete Custom Object
 */
server.post("Delete", server.middleware.https, function (req, res, next) {
    var form = req.form;
    var error = false;

    if (!form) {
        error = true;
    }

    var type = "Newsletter_Subscription";
    var keyValue = form.id;

    try {
        var newsletter = CustomObjectMgr.createCustomObject(type, keyValue);
        Transaction.wrap(function () {
            CustomObjectMgr.remove(newsletter);
        });
    } catch (error) {
        error = true;
    }

    if (error) {
        res.json({ error: true });
    } else {
        res.json({
            id: keyValue,
            error: false,
        });
    }
    return next();
});

module.exports = server.exports();
