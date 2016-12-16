var request = require('./request')();

var SUBSCR_RELOAD_AMT = 'https://devapi.globelabs.com.ph/location/v1/queries/reload_amount';

var SubscrReloadAmt = function(options, callback, logger) {
    if(!(this instanceof SubscrReloadAmt)) {
        return new SubscrReloadAmt(options, callback, logger);
    }

    this.logger = logger;

    // send get subscrreloadamt request
    // send request
    request
    // set request url
    .setUrl(SUBSCR_RELOAD_AMT)
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
}, subscrreloadamt = SubscrReloadAmt.prototype;

module.exports = SubscrReloadAmt;