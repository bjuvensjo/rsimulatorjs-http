var expect = require("expect.js");
var httpSimulator = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));


var getMockRequest = function () {
    var mockRequest = {
        method: "POST",
        url: "service",
        headers: {
            "content-type": "application/json"
        },
        on: function (name, callback) {
            this[name] = callback;
        }
    };

    return mockRequest;
};

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

describe("httpSimulator", function () {

    it("should exist", function () {
        expect(httpSimulator).to.be.ok();
    });

    it("should be possible to create", function () {
        var theHttpSimulator = httpSimulator.create({
            logLevel: 'error'
        });

        expect(theHttpSimulator).to.be.ok();
    });

    it("should handle request", function () {

        var options = {
            simulator: {
                service: function (simulatorRequest) {
                    return {
                        response: JSON.stringify(simulatorRequest)
                    };
                }
            },
            rootPath: ".",
            useRootRelativePath: true,
            logLevel: 'error'
        };
        var theHttpSimulator = httpSimulator.create(options);
        var requestBody = '{message: "Hello World!"}';
        var mockRequest = getMockRequest();
        var mockResponse = getMockResponse();
        var simulatorResponse;
        
        theHttpSimulator.handle(mockRequest, mockResponse);
        mockRequest.data(requestBody.substring(0, 10));
        mockRequest.data(requestBody.substring(10));
        mockRequest.end();

        expect(mockResponse.status).to.be(200);
        expect(mockResponse.headers["Content-Type"]).to.be("application/json; charset=UTF-8");

        simulatorResponse = JSON.parse(mockResponse.responseString);
        expect(simulatorResponse.rootPath).to.be(".");
        expect(simulatorResponse.rootRelativePath).to.be("service");
        expect(simulatorResponse.request).to.be(requestBody);
        expect(simulatorResponse.contentType).to.be("json");

    });

});
