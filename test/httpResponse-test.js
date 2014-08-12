var buster = require('buster'),
    httpResponse = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js')),
    getMockResponse = function () {
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

buster.testCase('httpResponse', {

    'should give 200': function () {
        var options = {
            response : getMockResponse(),
            simulatorResponse : {
                response: ''
            },
            contentType: 'application/json',
            encoding: 'UTF8'
        };
        httpResponse.send(options);
        assert.equals(options.response.status, 200);
    },

    'should give 404': function () {
        var options = {
            response : getMockResponse(),
            simulatorResponse : {
                response: 'No simulatorResponse found!'
            },
            contentType: 'application/json',
            encoding: 'UTF8'
        };
        httpResponse.send(options);
        assert.equals(options.response.status, 404);
    }
});
