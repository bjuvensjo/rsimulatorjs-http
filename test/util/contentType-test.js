var expect = require("expect.js");
var contentType = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));


describe("contentType", function () {

    it("should get application/json from Content-Type: application/json", function () {
        var expected = "application/json";

        var request = {
            headers: {
                "content-type": "application/json"
            }
        };

        expect(contentType.get(request)).to.be(expected);

    });

    it("should get application/json from Content-Type: application/json; charset=ISO-8859-1", function () {
        var expected = "application/json";

        var request = {
            headers: {
                "content-type": "application/json; charset=ISO-8859-1"
            }
        };

        expect(contentType.get(request)).to.be(expected);

    });

    it("should get text/html from Content-Type: text/html; charset=UTF-8", function () {
        var expected = "text/html";

        var request = {
            headers: {
                "content-type": "text/html; charset=UTF-8"
            }
        };

        expect(contentType.get(request)).to.be(expected);
    });

});
