"use strict";

var base = module.superModule;

/**
 * @constructor
 * @classdesc The stores model
 * @param {dw.catalog.Store} storeObject - a Store objects
 */
function store(storeObject) {
    base.call(this, store);

    if (storeObject.storeEvents) {
        this.storeEvents = storeObject.storeEvents;
    }
}

module.exports = store;
