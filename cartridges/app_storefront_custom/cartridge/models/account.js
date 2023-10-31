"use strict";

var base = module.superModule;

/**
 * Account class that represents the current customer's profile dashboard
 * @param {Object} profile - Current customer profile
 * @param {Object} addressModel - The current customer's preferred address
 * @param {Object} orderModel - The current customer's order history
 * @constructor
 */

function account(profile, addressModel, orderModel) {
    base.call(this, profile, addressModel, orderModel);

    this.profile.residence = customer.profile.getCustom().residence;
    this.profile.interests = customer.profile.getCustom().interests;
}

module.exports = account;
