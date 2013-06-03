var buster = require('buster');
var httpSimulator = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));
var log = require('../../rsimulatorjs-core/src/util/log');

var logger = log.getLogger('rsimulatorjs-http.httpSimulator-test');

var getMockRequest = function () {
    var mockRequest = {
        method: 'POST',
        url: 'service',
        headers: {
            'content-type': 'application/json'
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
            };
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

buster.testCase('httpSimulator', {

    'should exist': function () {
        assert(httpSimulator);
    },

    'should be possible to create': function () {
        var theHttpSimulator = httpSimulator.create();

        assert(theHttpSimulator);
    },

    'should handle request': function () {

        var options = {
            simulator: {
                service: function (options) {
                    return {
                        response: JSON.stringify(options)
                    };
                }
            },
            rootPath: '.',
            useRootRelativePath: true
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

        assert.equals(mockResponse.status, 200);
        assert.equals(mockResponse.headers['Content-Type'], 'application/json');

        simulatorResponse = JSON.parse(mockResponse.responseString);
        assert.equals(simulatorResponse.rootPath, '.');
        assert.equals(simulatorResponse.rootRelativePath, 'service');
        assert.equals(simulatorResponse.request, requestBody);
        assert.equals(simulatorResponse.contentType, 'json');

    }

});
