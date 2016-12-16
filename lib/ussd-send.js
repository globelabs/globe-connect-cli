var request = require('./request')();

var USSD_SEND = 'https://devapi.globelabs.com.ph/ussd/v1/outbound/{senderAddress}/send/requests';

var UssdSend = function(options, callback, logger) {
    if(!(this instanceof UssdSend)) {
        return new UssdSend(options, callback, logger);
    }

    this.logger = logger;

    // send ussd request
    this.sendUssd(
        options.senderAddress,
        options.message,
        options.address,
        options.accessToken,
        options.flash, 
        callback);
}, ussdsend = UssdSend.prototype;

/**
 * Send ussd request.
 *
 * @param  string
 * @param  string
 * @param  string
 * @param  string
 * @param  string
 * @param  function
 * @return null
 */
ussdsend.sendUssd = function(
    senderAddress,
    message,
    address,
    accessToken,
    flash,
    callback) {

    // format request url
    USSD_SEND = USSD_SEND.replace('{senderAddress}', senderAddress);

    // set payload
    var payload = {
        "outboundUSSDMessageRequest" : {
            "outboundUSSDMessage" : {
                "message ": message
            },
            "address" : address,
            "senderAddress" : senderAddress,
            "flash" : flash 
        }
    };

    // send request
    request
    // set request url
    .setUrl(USSD_SEND)
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

module.exports = UssdSend;