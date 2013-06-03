var log = require('../../../rsimulatorjs-core/src/util/log');


module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.util.simulatorContentType');

    var defaultSimulatorContentType = 'json';

    var simulatorContentTypeMap = {
        'application/json': 'json',
        'text/plain': 'text',
        'text/xml': 'xml'
    };

    // TODO Make use of parameter and support more content types.
    var getSimulatorContentType = function (contentType) {
        return simulatorContentTypeMap[contentType] || defaultSimulatorContentType;
    };

    return {
        get: getSimulatorContentType
    };

}());

