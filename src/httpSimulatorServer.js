var http = require('http');
var httpProxy = require('http-proxy');
var httpSimulator = require('./httpSimulator');
var log = require('../../rsimulatorjs-core/src/util/log');


module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.httpSimulatorServer');
    
    return function (options) {
        
        // Create the httpSimulator
        var theHttpSimulator = httpSimulator.create({
            simulator: options.httpSimulatorConfig.simulator,
            rootPath: options.httpSimulatorConfig.rootPath,
            useRootRelativePath: options.httpSimulatorConfig.useRootRelativePath
        });

        // Create a http server, i.e. the one running the httpSimulator
        http.createServer(function (request, response) {
            theHttpSimulator.handle(request, response);
        }).listen(options.port);

        // If configured, create a proxy server
        if (options.proxyConfig) {
            httpProxy.createServer(options.proxyConfig.options).listen(options.proxyConfig.port);
        };
        
    };

}());

