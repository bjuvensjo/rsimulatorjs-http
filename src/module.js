var httpSimulator = require('./httpSimulator');
var simulator = require('rsimulatorjs-core');
var _ = require('underscore');

module.exports = (function () {

    var create = function (options) {
        var httpSimulatorOptions = _.clone(options);

        httpSimulatorOptions.simulator = simulator;
        simulator.setGlobalLogLevel(options.logLevel);

        return httpSimulator.create(httpSimulatorOptions);
    };    

    //  example: options = {
    //     rootPath: '.',
    //     useRootRelativePath: true
    // };
    return {
        create: create
    }; 

}());
