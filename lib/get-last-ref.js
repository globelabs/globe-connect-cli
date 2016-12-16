var Payment = require('./payment');

var GetLastRef = function(options, callback, logger) {
    if(!(this instanceof GetLastRef)) {
        return new GetLastRef(options, callback, logger);
    }

    var payment = new Payment(options, callback, logger);
};

module.exports = GetLastRef;