var buster = require('buster');
var fileUtils = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));

buster.testCase('httpSimulator', {

    'handle': function () {
        assert(false);
    }

});


