var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var File = require("dw/io/File");
var FileWriter = require("dw/io/FileWriter");
var CSVStreamWriter = require("dw/io/CSVStreamWriter");
var Transaction = require("dw/system/Transaction");
var Logger = require("dw/system/Logger");

module.exports.execute = function () {
    var newsletterSubsObjectIterator = CustomObjectMgr.getAllCustomObjects(
        "Newsletter_Subscription"
    );

    var file; var fileWrite; var csvw;

    try {
        file = new File([File.IMPEX, "newsletter", "newsletterSubs.csv"].join(File.SEPARATOR));
        fileWrite = new FileWriter(file);
        csvw = new CSVStreamWriter(fileWrite);

        csvw.writeNext(["Email", "First Name", "Last Name", "Gender"]);

        while (newsletterSubsObjectIterator.hasNext()) {
            var newsletter = newsletterSubsObjectIterator.next();

            csvw.writeNext([
                newsletter.custom.email,
                newsletter.custom.firstName,
                newsletter.custom.lastName,
                newsletter.custom.gender,
            ]);

            Transaction.wrap(function () {
                CustomObjectMgr.remove(newsletter);
            });
        }
    } catch (err) {
        Logger.error("Error", err.message);
    } finally {
        csvw.close();
        fileWrite.close();
    }
};
