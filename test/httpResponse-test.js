var expect = require("expect.js");
var httpResponse = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));
var getMockResponse = function () {
    var mockResponse = {
        end: function (response, encoding) {
            if (response) {
                this.responseString = response;
            }
        },
        write: function (response, encoding) {
            this.end(response, encoding);
        },
        writeHead: function (status, headers) {
            this.status = status;
            this.headers = headers;
        }
    };
    
    return mockResponse;
};

describe("httpResponse", function () {

    it("should give 200", function () {
        var options = {
            response : getMockResponse(),
            simulatorResponse : {
                response: ""
            },
            contentType: "application/json",
            encoding: "UTF8"
        };
        httpResponse.send(options);
        
        expect(options.response.status).to.be(200);
    });

    it("should give 404", function () {
        var options = {
            response : getMockResponse(),
            simulatorResponse : {
                response: "No simulatorResponse found!"
            },
            contentType: "application/json",
            encoding: "UTF8"
        };
        httpResponse.send(options);
        
        expect(options.response.status).to.be(404);
    });
});
