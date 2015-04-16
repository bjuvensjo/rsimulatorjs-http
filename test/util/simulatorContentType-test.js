var expect = require("expect.js");
var simulatorContentType = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));


describe("simulatorContentType", function () {

    it("should get json from application/json", function () {
        var expected = "json";
        var contentType = "application/json";

        expect(simulatorContentType.get(contentType)).to.be(expected);

    });

    it("should get text from text/plain", function () {
        var expected = "text";
        var contentType = "text/plain";

        expect(simulatorContentType.get(contentType)).to.be(expected);
    });

    it("should get xml from text/xml", function () {
        var expected = "xml";
        var contentType = "text/xml";

        expect(simulatorContentType.get(contentType)).to.be(expected);
    });

});
