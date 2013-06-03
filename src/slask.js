var http = require('http');
var log = require('../../rsimulatorjs-core/src/util/log');

var logger = log.getLogger('rsimulatorjs-http.slask');

// Create a http server, i.e. the one running the httpSimulator
http.createServer(function (request, response) {
    var method = request.method;
    var url = request.url;

    logger.debug('method: %s', method);
    logger.debug('url: %s', url);
    
    var fullBody = '';

    request.on('data', function(chunk) {
        var chunkString = chunk.toString();
        logger.debug('Received body data: %s', chunkString);
        fullBody += chunkString;
    });
    
    request.on('end', function() {
        // empty 200 OK response for now
        logger.debug('fullBody: %s', fullBody);

        response.writeHead(200, "OK", {'Content-Type': 'text/html'});
        response.end('Hello World!');
    });            

}).listen(8000);

