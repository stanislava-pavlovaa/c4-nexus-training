"use strict";

// Create a function to get product by a given ID​
/**
 * @param {dw.catalog.Product} product
 * @returns {String} product ID
 */
function getProductID(product) {
    return product.getID();
}

// Create a function to get product category by given product​
/**
 * @param {dw.catalog.Product} product
 * @returns {Collection} product categories
 */
function getProductCategory(product) {
    return product.getCategories();
}

// Create a function to get different product prices for a given product​
/**
 * @param {dw.catalog.Product} product
 * @returns {ProductPriceModel} product prices
 */
function getProductPrice(product) {
    return product.getPriceModel();
}

// Create a function to get catalog main categories​
/**
 *
 * @param {dw.catalog.Catalog} catalog
 * @returns {Collection}  collection 
 */
function getMainCategory(catalog) {
    return catalog.getRoot().getSubCategories();
}

// Create a function to get customer by ID​
/**
 *
 * @param {dw.customer.Customer} customer
 * @returns {String} customer ID
 */
function getCustomerID(customer) {
    return customer.getID();
}

// Create a function to check if a given customer is assigned to a given customer group​
/**
 * @param {dw.customer.Customer} customer
 * @returns {boolean} true or false
 *
 */
function getCustomerGroup(customer, customerGroup) {
    return customer.isMemberOfCustomerGroup(customerGroup)
}

/**
 * @constructor
 * @param {*} product
 */
function DWScriptModelHW(product) {
    this.ID = getProductID(product);
    this.ProductCategory = getProductCategory(product);
    this.ProductPrices = getProductPrice(product);
    this.MainCategory = getMainCategory(product);
}

/**
 * @constructor
 * @param {*} customer
 */
function DWScriptModel(customer, customerGroup) {
    this.ID = getCustomerID(customer);
    this.CustomerGroup = getCustomerGroup(customer, customerGroup);
}

module.exports = DWScriptModelHW;
