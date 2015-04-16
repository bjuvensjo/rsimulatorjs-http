var expect = require("expect.js");
var module = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));

describe("module", function () {

    it("should have a create function object", function () {

        var actual = module.create;

        expect(actual).to.be.ok();
    
    });

    it("should create a httpSimulator with a handle function object", function () {

        var httpSimulator = module.create({
            rootPath: ".",
            useRootRelativePath: true,
            logLevel: 'error'
        });

        var actual = httpSimulator.handle;

        expect(actual).to.be.ok();
    
    });

});
