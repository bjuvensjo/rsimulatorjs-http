var expect = require("expect.js");
var encoding = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));


describe("encoding", function () {

    it("should get UTF-8 from Content-Type: text/html; charset=UTF-8", function () {
        var contentType = "Content-Type: text/html; charset=UTF-8";

        expect(encoding.get(contentType)).to.be("UTF-8");
    });

    it("should get ISO-8859-1 from Content-Type: application/json; charset=ISO-8859-1", function () {
        var contentType = "Content-Type: text/html; charset=ISO-8859-1";

        expect(encoding.get(contentType)).to.be("ISO-8859-1");
    });

});
