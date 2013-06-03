var jsonHandler = require('../../rsimulatorjs-core/src/handler/regexp/jsonHandler');
var log = require('../../rsimulatorjs-core/src/util/log');
var simulator = require('../../rsimulatorjs-core/src/simulator');


module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.httpSimulator');

    var theSimulator = simulator.create({
        handlers: {
            json: jsonHandler
        }
    });

    var handle = function (request, response, options) {
        var body = '';

        request.on('data', function(chunk) {
            var chunkString = chunk.toString();
            logger.debug('Received body data: %s', chunkString);
            body += chunkString;
        });
        
        request.on('end', function() {

            var simulatorRequest = {
                rootPath: options.rootPath || '.',
                rootRelativePath: options.useRootRelativePath ? request.url : '',
                request: body,
                contentType: 'json'
            };

            logger.debug('simulatorRequest: %j', simulatorRequest);

            var simulatorResponse = theSimulator.service(simulatorRequest);

            logger.debug('simulatorResponse: %j', simulatorResponse);
            
            // TODO Implement handling of response according to rsimulator
            
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(simulatorResponse.response);
            response.end();

        });            

    };

    var create = function (options) {
        var that = {};

        that.handle = function (request, response) {
            handle(request, response, options);
        };

        return that;
    };

    return {
        create: create
    };

}());

