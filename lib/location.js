var request = require('./request')();

var LOCATION_URL = 'https://devapi.globelabs.com.ph/location/v1/queries/location';

var Location = function(options, callback, logger) {
    if(!(this instanceof Location)) {
        return new Location(options, callback, logger);
    }

    this.logger = logger;

    // send get location request
    this.getLocation(
        options.accessToken,
        options.address,
        options.accuracy,
        callback);
}, location = Location.prototype;

/**
 * Send get location request.
 *
 * @param  string
 * @param  string
 * @param  int
 * @param  function
 * @return null
 */
location.getLocation = function(
    accessToken,
    address,
    accuracy,
    callback) {

    // send request
    request
    // set request url
    .setUrl(LOCATION_URL)
    // set request parameters
    .setParams({
        access_token : accessToken,
        address : address,
        requestedAccuracy : accuracy
    })
    // set logger
    .setLogger(this.logger)
    // send get request
    .sendGet(function(code, body, totalTime) {
        callback(code, body, totalTime);
    });
}

module.exports = Location;