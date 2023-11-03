var CustomObjectMgr = require("dw/object/CustomObjectMgr");
var { File, FileWriter, XMLStreamWriter } = require("dw/io");

module.exports.execute = function () {
    var demoObjectIterator = CustomObjectMgr.getAllCustomObjects("DemoObject");

    var file;
    var fileWriter;
    var xsw;

    try {
        file = new File([File.IMPEX, "text.xml"].join(File.SEPARATOR));
        fileWriter = new FileWriter(file);

        xsw = new XMLStreamWriter(fileWriter);

        xsw.writeStartDocument();
        xsw.writeStartElement("products");

        while (demoObjectIterator.hasNext()) {
            var demo = demoObjectIterator.next();
            xsw.writeStartElement("product");
            xsw.writeAttribute("id", demo.custom.product);
            xsw.writeAttribute("name", demo.custom.name);
            xsw.writeEndElement();
        }
        xsw.writeEndElement();
    } catch (error) {
    } finally {
        xsw.close();
        fileWriter.close();
    }
};
