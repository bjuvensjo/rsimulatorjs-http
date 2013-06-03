var log = require('../../../rsimulatorjs-core/src/util/log');

module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.util.encoding');

    var charsetPattern = /charset=([0-9A-Z-]+)/;

    var getEncoding = function (contentType) {
        var encoding = 'UTF-8';
        var charsetGroups;
        var charset;

        if (contentType) {
            charsetGroups = charsetPattern.exec(contentType);

            if (charsetGroups) {
                encoding = charsetGroups[1];
            };
        };

        logger.debug('encoding: %s', encoding);

        return encoding;
    };

    return {
        get: getEncoding
    };

}());

