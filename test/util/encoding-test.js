var buster = require('buster');
var encoding = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));


buster.testCase('encoding', {

    'should get UTF-8 from "Content-Type: text/html; charset=UTF-8"': function () {
        var contentType = 'Content-Type: text/html; charset=UTF-8';

        assert.equals('UTF-8', encoding.get(contentType));
    },

    'should get ISO-8859-1 from "Content-Type: application/json; charset=ISO-8859-1"': function () {
        var contentType = 'Content-Type: text/html; charset=ISO-8859-1';

        assert.equals('ISO-8859-1', encoding.get(contentType));
    }

});
