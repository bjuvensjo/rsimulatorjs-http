var log = require('rsimulatorjs-log');
var simulatorContentType = require('./util/simulatorContentType');


module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.simulatorRequest');

    var create = function (options) {

        var simulatorRequest = {
            rootPath: options.rootPath || '.',
            rootRelativePath: options.useRootRelativePath ? options.url : '',
            request: options.body,
            contentType: simulatorContentType.get(options.contentType)
        };

        logger.debug('simulatorRequest: %j', simulatorRequest);
        
        return simulatorRequest;
    };

    return {
        create: create
    };

}());

