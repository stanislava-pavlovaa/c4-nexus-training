"use strict";

/**
 *
 * @param {dw.customer.Customer} customer
 * @returns {String} customer ID
 */
function getCustomerID(customer) {
    return customer.getID();
}

function getCustomerFirstName(customer) {
    return customer.profile.firstName;
}

/**
 * @constructor
 * @param {*} customer
 */
function DWScriptModel(customer) {
    this.ID = getCustomerID(customer);
    this.FirstName = getCustomerFirstName(customer)
}

module.exports = DWScriptModel;
