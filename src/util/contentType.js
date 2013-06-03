var log = require('../../../rsimulatorjs-core/src/util/log');


module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.util.contentType');

    var contentTypePattern = /([^;]+)/;

    var getContentType = function (request) {
        var contentTypeHeader = request.headers['content-type'];
        var contentTypeGroups = contentTypePattern.exec(contentTypeHeader);
        var contentType = contentTypeGroups[1];

        logger.debug('contentTypeHeader: %s', contentTypeHeader);
        logger.debug('contentTypeGroups: %j', contentTypeGroups);
        logger.debug('contentType: %s', contentType);

        return contentType;
    };

    return {
        get: getContentType
    };

}());

