var log = require('../../rsimulatorjs-core/src/util/log');

module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.httpSimulator');

    // TODO Make use of parameters and support more content types.
    var getSimulatorContentType = function (request) {
        var headers = request.headers;

        logger.debug('Content-Type: %s', headers['content-type']);
        logger.debug('Accept: %s', headers['accept']);

        return 'json';
    };

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
                contentType: getSimulatorContentType(request)
            };

            logger.debug('simulatorRequest: %j', simulatorRequest);

            var simulatorResponse = options.simulator.service(simulatorRequest);

            logger.debug('simulatorResponse: %j', simulatorResponse);
            
            // TODO Implement handling of response according to rsimulator
            
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(simulatorResponse.response);
            response.end();

        });            

    };

    // options example:
    // {
    //     simulator: simulator.create({
    //         handlers: {
    //             json: jsonHandler
    //         }
    //     })
    //     rootPath: '.',
    //     useRootRelativePath: true
    // }
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

