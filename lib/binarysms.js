var request = require('./request')();

var BIN_SMS = 'https://devapi.globelabs.com.ph/binarymessaging/v1/outbound/{senderAddress}/requests';

var BinarySms = function(options, callback, logger) {
    if(!(this instanceof BinarySms)) {
        return new BinarySms(options, callback, logger);
    }

    this.logger = logger;

    // send sms request
    this.sendSms(
        options.senderAddress,
        options.accessToken,
        options.address,
        options.message,
        options.userDataHeader, 
        options.dataCodingScheme,
        callback);
}, sms = BinarySms.prototype;

/**
 * Send sms request.
 *
 * @return null
 */
sms.sendSms = function(
    senderAddress,
    accessToken,
    address,
    message,
    userDataHeader,
    dataCodingScheme,
    callback) {

    // format request url
    BIN_SMS = BIN_SMS.replace('{senderAddress}', senderAddress);

    // set payload
    var payload = {
        "outboundBinaryMessageRequest": {
            "senderAddress" : senderAddress,
            "userDataHeader" : userDataHeader,
            "dataCodingScheme" : dataCodingScheme,
            "outboundBinaryMessage" : {
                "message" : message
            },
            "address" : address
        }
    };

    // send request
    request
    // set request url
    .setUrl(BIN_SMS)
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

module.exports = BinarySms;