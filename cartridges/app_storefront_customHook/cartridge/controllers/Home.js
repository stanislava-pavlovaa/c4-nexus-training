"use strict";

var server = require("server");
var HookMgr = require("dw/system/HookMgr");
server.extend(module.superModule);

server.append("Show", function (req, res, next) {
    var viewData = res.getViewData();

    if (HookMgr.hasHook("app.home.calculate")) {
        HookMgr.callHook("app.home.calculate", "calculatePrice", viewData);
    }

    res.setViewData(viewData);
    
    next();
});

module.exports = server.exports();
