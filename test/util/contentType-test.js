var buster = require('buster');
var contentType = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));


buster.testCase('contentType', {

    'should get "application/json" from "Content-Type: application/json"': function () {
        var expected = 'application/json';

        var request = {
            headers: {
                'content-type': 'application/json'
            }
        };

        assert.equals(expected, contentType.get(request));

    },

    'should get "application/json" from "Content-Type: application/json; charset=ISO-8859-1"': function () {
        var expected = 'application/json';

        var request = {
            headers: {
                'content-type': 'application/json; charset=ISO-8859-1'
            }
        };

        assert.equals(expected, contentType.get(request));

    },

    'should get "text/html" from "Content-Type: text/html; charset=UTF-8"': function () {
        var expected = 'text/html';

        var request = {
            headers: {
                'content-type': 'text/html; charset=UTF-8'
            }
        };

        assert.equals(expected, contentType.get(request));
    }

});
