var log = require('../../../rsimulatorjs-core/src/util/log');


module.exports = (function () {

    var logger = log.getLogger('rsimulatorjs-http.util.simulatorContentType');

    // TODO Make use of parameter and support more content types.
    var getSimulatorContentType = function (contentType) {
        return 'json';
    };

    return {
        get: getSimulatorContentType
    };

}());

