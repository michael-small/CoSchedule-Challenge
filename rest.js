// The bulk of the scraper code and the GET code comes from Brent Anderson, archived and last changed in late 2012
// Link to Brent's MIT Liscense: https://github.com/brentjanderson/xkcd/blob/master/LICENSE

var http = require("follow-redirects").http;
var https = require("follow-redirects").https;

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getJSON = function(options, onResult)
{
    var prot = options.port === 443 ? https : http;
    var errorTally = 0;
    var req = prot.request(options, function(res)
    { //standard way I've seen the http/https modules scrape data in chunks into one file, bit verbose but I'm running with it
        var output = '';
        var obj = '';

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
			if (res.statusCode === 200) {
                obj = JSON.parse(output);
                onResult(res.statusCode, obj);
            } else {
                errorTally += 1;
                console.log('Item not found #' + errorTally + ' @ ' + options.host + ':' + res.statusCode); //if nothing wrong, should only be 1 (they purposely didn't publish a comic #404)
                console.log();
            }
        });
    });
    req.on('error', function(err) {
        console.log('error')
    });
    req.end();
};