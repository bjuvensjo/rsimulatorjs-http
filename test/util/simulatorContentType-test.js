var buster = require('buster');
var simulatorContentType = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));


buster.testCase('simulatorContentType', {

    'should get "json" from "application/json"': function () {
        var expected = 'json';
        var contentType = 'application/json';

        assert.equals(expected, simulatorContentType.get(contentType));

    },

    'should get "text" from "text/plain"': function () {
        var expected = 'text';
        var contentType = 'text/plain';

        assert.equals(expected, simulatorContentType.get(contentType));
    },

    'should get "xml" from "text/xml"': function () {
        var expected = 'xml';
        var contentType = 'text/xml';

        assert.equals(expected, simulatorContentType.get(contentType));
    }

});
