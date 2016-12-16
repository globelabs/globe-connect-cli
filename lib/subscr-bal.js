var request = require('./request')();

var SUBSCR_BAL = 'https://devapi.globelabs.com.ph/location/v1/queries/balance';

var SubscrBal = function(options, callback, logger) {
    if(!(this instanceof SubscrBal)) {
        return new SubscrBal(options, callback, logger);
    }

    this.logger = logger;

    // send get subscrbal request
    // send request
    request
    // set request url
    .setUrl(SUBSCR_BAL)
    // set request parameters
    .setParams({
        access_token : options.accessToken,
        address : options.address,
    })
    // set logger
    .setLogger(this.logger)
    // send get request
    .sendGet(function(code, body, totalTime) {
        callback(code, body, totalTime);
    });
}, subscrbal = SubscrBal.prototype;

module.exports = SubscrBal;