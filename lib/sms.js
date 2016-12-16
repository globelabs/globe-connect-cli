var request = require('./request')();

var SMS_MT = 'https://devapi.globelabs.com.ph/smsmessaging/v1/outbound/{senderAddress}/requests';

var Sms = function(options, callback, logger) {
    if(!(this instanceof Sms)) {
        return new Sms(options, callback, logger);
    }

    this.logger = logger;

    // send sms request
    this.sendSms(
        options.senderAddress,
        options.accessToken,
        options.address,
        options.message,
        options.clientCorrelator, 
        callback);
}, sms = Sms.prototype;

/**
 * Send sms request.
 *
 * @param  string
 * @param  string
 * @param  string
 * @param  string
 * @param  string
 * @param  function
 * @return null
 */
sms.sendSms = function(
    senderAddress, 
    accessToken,
    address,
    message,
    clientCorrelator,
    callback) {

    // format request url
    SMS_MT = SMS_MT.replace('{senderAddress}', senderAddress);

    // set payload
    var payload = {
        "outboundSMSMessageRequest": {
            "senderAddress" : senderAddress,
            "outboundSMSTextMessage" : {
                "message" : message
            },
            "address" : address
        }
    };

    // client correlator set?
    if(clientCorrelator) {
        payload.outboundSMSMessageRequest.clientCorrelator = clientCorrelator;
    }

    // send request
    request
    // set request url
    .setUrl(SMS_MT)
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

module.exports = Sms;