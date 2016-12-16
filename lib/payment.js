var request = require('./request')();

var PAYMENT_URL = 'https://devapi.globelabs.com.ph/payment/v1/transactions/amount';
var GET_LAST_REF = 'https://devapi.globelabs.com.ph/payment/v1/transactions/getLastRefCode';

var Payment = function(options, callback, logger) {
    if(!(this instanceof Payment)) {
        return new Payment(options, callback, logger);
    }

    this.logger = logger;

    if(options._.shift() == 'get-last-ref') {
        this.getLastRefCode(options.appId, options.appSecret, callback);
    
        return this;
    }

    // send payment request
    this.sendPaymentRequest(
        options.accessToken,
        options.amount,
        options.description,
        options.endUserId,
        options.referenceCode,
        options.status,
        callback);
}, payment = Payment.prototype;

/**
 * Send payment request.
 * 
 * @param  string
 * @param  float
 * @param  string
 * @param  string
 * @param  string
 * @param  string
 * @param  function
 * @return null
 */
payment.sendPaymentRequest = function(
    accessToken,
    amount,
    description,
    endUserId,
    referenceCode,
    status,
    callback) {

    // set payload
    var payload = {
        "amount" : amount.toFixed(2),
        "description" : description,
        "endUserId" : endUserId,
        "referenceCode" : referenceCode,
        "transactionOperationStatus" : status
    };

    // send request
    request
    // set request url
    .setUrl(PAYMENT_URL)
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
};

/**
 * Get last reference code request.
 *
 * @param  string
 * @param  string
 * @param  function
 * @return this
 */
payment.getLastRefCode = function(
    appId, 
    appSecret,
    callback) {

    // send request
    request
    // set request url
    .setUrl(GET_LAST_REF)
    // set request parameters
    .setParams({
        app_id : appId,
        app_secret : appSecret
    })
    // set logger
    .setLogger(this.logger)
    // send get request
    .sendGet(function(code, body, totalTime) {
        callback(code, body, totalTime);
    });
};

module.exports = Payment;