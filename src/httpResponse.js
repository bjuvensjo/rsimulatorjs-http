var log = require('../../rsimulatorjs-core/src/util/log');

module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.httpResponse');

    var send = function (options) {
        var response = options.response;

        logger.debug('simulatorResponse: %j', options.simulatorResponse);
            
        response.writeHead(200, { 'Content-Type': options.contentType });

        response.end(options.simulatorResponse.response, options.encoding);

    };            

    return {
        send: send
    };

}());

