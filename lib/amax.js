var request = require('./request')();

var AMAX_URL = 'https://devapi.globelabs.com.ph/rewards/v1/transactions/send';

var Amax = function(options, callback, logger) {
    if(!(this instanceof Amax)) {
        return new Amax(options, callback, logger);
    }

    this.logger = logger;

    // send amax request
    this.sendAmax(
        options.appId,
        options.appSecret,
        options.rewardsToken,
        options.promo,
        options.address,
        callback);
}, amax = Amax.prototype;

/**
 * Send amax request.
 *
 * @param  string
 * @param  string
 * @param  string
 * @param  string
 * @param  string
 * @param  function
 * @return null
 */
amax.sendAmax = function(
    appId,
    appSecret,
    rewardsToken,
    promo,
    address,
    callback) {

    // set payload
    var payload = {
        "outboundRewardRequest" : {
            "app_id" : appId,
            "app_secret" : appSecret,
            "rewards_token" : rewardsToken,
            "address" : address,
            "promo" : promo 
        } 
    };

    // send request
    request
    // set request url
    .setUrl(AMAX_URL)
    // set logger
    .setLogger(this.logger)
    // set data
    .setData(payload)
    // send post request
    .sendPost(function(code, body, totalTime) {
        callback(code, body, totalTime);
    });
}

module.exports = Amax;