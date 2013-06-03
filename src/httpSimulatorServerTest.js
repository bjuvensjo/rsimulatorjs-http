var http = require('http');
var httpSimulatorServer = require('./httpSimulatorServer');
var jsonHandler = require('../../rsimulatorjs-core/src/handler/regexp/jsonHandler');
var log = require('../../rsimulatorjs-core/src/util/log');
var simulator = require('../../rsimulatorjs-core/src/simulator');

var logger = log.getLogger('rsimulatorjs-http.httpSimulatorServerTest');

(function () {
    
    var options = {
        httpSimulatorConfig: {
            simulator: simulator.create({
                handlers: {
                    json: jsonHandler
                }
            }),
            rootPath: '../test/testFiles',
            useRootRelativePath: true
        },
        port: 9000,
        proxyConfig: {
            port: 8000,
            options: {
                pathnameOnly: true,
                router: {
                    '/service': '127.0.0.1:9000',
                    '': '127.0.0.1:9001'
                }
            }
        }
    };

    httpSimulatorServer(options);

}());
