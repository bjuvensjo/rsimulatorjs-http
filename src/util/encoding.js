var log = require('rsimulatorjs-log');


module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.util.encoding');

    var charsetPattern = /charset=([0-9A-Z-]+)/;

    var defaultEncoding = 'UTF-8';

    var getEncoding = function (contentType) {
        var encoding;
        var charsetGroups;
        var charset;

        if (contentType) {
            charsetGroups = charsetPattern.exec(contentType);

            if (charsetGroups) {
                encoding = charsetGroups[1];
            };
        };

        logger.debug('encoding: %s', encoding);

        return encoding || defaultEncoding;
    };

    return {
        get: getEncoding
    };

}());

