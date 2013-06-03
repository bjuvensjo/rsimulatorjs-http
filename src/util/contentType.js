var log = require('../../../rsimulatorjs-core/src/util/log');


module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.util.contentType');

    var getContentType = function (request) {
        var contentType = request.headers['content-type'];

        logger.debug('contentType: %s', contentType);

        return contentType;
    };

    return {
        get: getContentType
    };

}());

