var contentType = require('./util/contentType');
var encoding = require('./util/encoding');
var httpResponse = require('./httpResponse');
var log = require('../../rsimulatorjs-core/src/util/log');
var simulatorContentType = require('./util/simulatorContentType');
var simulatorRequest = require('./simulatorRequest');


module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.httpSimulator');

    // TODO Handle all methods; GET, POST, PUT, DELETE
    var handle = function (request, response, options) {
        var body = '';
        var theContentType = contentType.get(request);
        var theEncoding = encoding.get(theContentType);

        request.on('data', function(chunk) {
            var chunkString = chunk.toString(theEncoding);

            logger.debug('Received body data: %s', chunkString);

            body += chunkString;
        });
        
        request.on('end', function() {

            var theSimulatorRequest = simulatorRequest.create({
                rootPath: options.rootPath || '.',
                useRootRelativePath: options.useRootRelativePath,
                url: request.url,
                body: body,
                contentType: contentType
            });

            var theSimulatorResponse = options.simulator.service(theSimulatorRequest);

            var sendOptions = {
                response: response,
                simulatorResponse: theSimulatorResponse,
                contentType: theContentType,
                encoding: theEncoding
            };

            httpResponse.send(sendOptions);

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

