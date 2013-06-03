var http = require('http');
var log = require('../../rsimulatorjs-core/src/util/log');
var httpSimulatorServer = require('./httpSimulatorServer');

var logger = log.getLogger('rsimulatorjs-http.httpSimulatorServerTest');

(function () {
    
    var options = {
        httpSimulatorConfig: {
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
