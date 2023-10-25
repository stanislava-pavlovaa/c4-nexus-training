"use strict";

var base = module.superModule;

/**
 * Account class that represents the current customer's profile dashboard
 * @param {Object} currentCustomer - Current customer
 * @param {Object} addressModel - The current customer's preferred address
 * @param {Object} orderModel - The current customer's order history
 * @constructor
 */

function account(profile, addressBook, orderModel) {
    base.call(this, profile, addressBook, orderModel);

    this.profile.residence = customer.profile.getCustom().residence;
    this.profile.interests = customer.profile.getCustom().interests;
}

module.exports = account;
