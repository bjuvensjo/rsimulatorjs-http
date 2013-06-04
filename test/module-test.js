var buster = require('buster');
var module = require(__filename.replace(/test/, 'src').replace(/-test.js$/, '.js'));

buster.testCase('module', {

    'should have a create function object': function () {

        var actual = module.create;

        assert(actual);
    
    },

    'should create a httpSimulator with a handle function object': function () {

        var httpSimulator = module.create({
            rootPath: '.',
            useRootRelativePath: true            
        });

        var actual = httpSimulator.handle;

        assert(actual);
    
    }

});
