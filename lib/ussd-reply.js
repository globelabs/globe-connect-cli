var request = require('./request')();

var USSD_REPLY = 'https://devapi.globelabs.com.ph/ussd/v1/outbound/{senderAddress}/reply/requests';

var UssdReply = function(options, callback, logger) {
    if(!(this instanceof UssdReply)) {
        return new UssdReply(options, callback, logger);
    }

    this.logger = logger;

    // send ussd request
    this.sendUssd(
        options.senderAddress,
        options.message,
        options.address,
        options.accessToken,
        options.flash, 
        options.sessionId,
        callback);
}, ussdreply = UssdReply.prototype;

/**
 * Send ussd request.
 *
 * @param  string
 * @param  string
 * @param  string
 * @param  string
 * @param  string
 * @param  string
 * @param  function
 * @return null
 */
ussdreply.sendUssd = function(
    senderAddress,
    message,
    address,
    accessToken,
    flash,
    sessionId,
    callback) {

    // format request url
    USSD_REPLY = USSD_REPLY.replace('{senderAddress}', senderAddress);

    // set payload
    var payload = {
        "outboundUSSDMessageRequest" : {
            "outboundUSSDMessage" : {
                "message ": message
            },
            "address" : address,
            "senderAddress" : senderAddress,
            "flash" : flash,
            "sessionID" : sessionId
        }
    };

    // send request
    request
    // set request url
    .setUrl(USSD_REPLY)
    // set request parameters
    .setParams({
        access_token : accessToken
    })
    // set logger
    .setLogger(this.logger)
    // set data
    .setData(payload)
    // send post request
    .sendPost(function(code, body, totalTime) {
        callback(code, body, totalTime);
    });
}

module.exports = UssdReply;