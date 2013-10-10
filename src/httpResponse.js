var log = require('rsimulatorjs-log');


module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.httpResponse');

    var send = function (options) {
        var response = options.response;

        logger.debug('simulatorResponse: %j', options.simulatorResponse);
        if (options.simulatorResponse.response === 'No simulatorResponse found!') {
             response.writeHead(404, { 'Content-Type': options.contentType + '; charset=' + options.encoding,
                    'Error-Message': options.simulatorResponse.response, 'Error-Code': 0});
        } else {
            response.writeHead(200, { 'Content-Type': options.contentType + '; charset=' + options.encoding });
        }

        response.end(options.simulatorResponse.response, options.encoding);

    };            

    return {
        send: send
    };

}());

