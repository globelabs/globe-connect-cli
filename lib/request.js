// require curl
var Curl = require('node-libcurl').Curl;

/**
 * Initialize request object.
 *
 * @param  string
 * @return this
 */
var Request = function(url) {
    // short hand initialization
    if(!(this instanceof Request)) {
        return new Request(url);
    }

    // set url
    this.url = url || null;

    // set request headers
    this.headers = [
        'Content-Type: application/json',
        'User-Agent: Mozilla/5.0'
    ];

}, request = Request.prototype;

/**
 * Set request url.
 *
 * @param  string
 * @return this
 */
request.setUrl = function(url) {
    // set request url
    this.url = url;

    return this;
};

/**
 * Set url parameters.
 *
 * @param  object
 * @return this
 */
request.setParams = function(params) {
    // set url parameters
    this.params = params;

    return this;
};

/**
 * Set request data.
 *
 * @param  object
 * @return this
 */
request.setData = function(data) {
    // set request data
    this.data = data;

    return this;
};

/**
 * Set default logger.
 *
 * @param  object
 * @return this
 */
request.setLogger = function(logger) {
    this.logger = logger;

    return this;
};

/**
 * Send get request.
 *
 * @return null
 */
request.sendGet = function(callback) {
    // format request url
    this.url = this.url + this.toQueryString(this.params);

    this.logger('Sending ' +
        this.logger('GET', 'green.bgBlack.bold', true) + 
        ' request to: ' + 
        this.logger(this.url, 'yellow.bgBlack.underline', true));

    this.logger('');

    // initialize curl
    var curl = new Curl();

    // set request url
    curl.setOpt(Curl.option.URL, this.url);
    // set request headers
    curl.setOpt(Curl.option.HTTPHEADER, this.headers);
    // perform request
    curl.perform();

    var self = this;
        
    // on request end
    curl.on('end', function(responseCode, body, info){
        // default response code color
        var code = self.logger(responseCode, 'green.bgBlack', true);

        // 400 response code and up
        if(responseCode >= 400) {
            code = self.logger(responseCode + ' ' + info[0]['result']['reason'], 'yellow.bgBlack', true);

        // 500 response code and up
        } else if(responseCode >= 500) {
            code = self.logger(responseCode + ' ' + info[0]['result']['reason'], 'red.bgBlack', true);
        }

        self.logger(self.logger('Status Code', 'cyan', true) + ' : ' + code);
        self.logger(self.logger('Content Length', 'cyan', true) + ' : ' + self.logger(info[0]['Content-Length'], 'blue.bgBlack', true));
        self.logger(self.logger('Content Type', 'cyan', true) + ' : ' + self.logger(info['0']['Content-Type'], 'blue.bgBlack', true));
        self.logger(self.logger('Body', 'cyan', true) + ' : --');
        self.logger('');
        self.logger('# ---->');
        self.logger(body);
        self.logger('<---- #');
        self.logger('');

        // return response code and response body
        callback(responseCode, body, this.getInfo('TOTAL_TIME'));

        // close resource
        this.close();
    });
};

/**
 * Send post request.
 *
 * @return null
 */
request.sendPost = function(callback) {
    // format request url
    this.url = this.url + this.toQueryString(this.params);

    this.logger('Sending ' +
        this.logger('POST', 'green.bgBlack.bold', true) + 
        ' request to: ' + 
        this.logger(this.url, 'yellow.bgBlack.underline', true));

    this.logger('');

    // initialize curl
    var curl = new Curl();

    // set request url
    curl.setOpt(Curl.option.URL, this.url);
    // set request method
    curl.setOpt(Curl.option.POST, true);
    // set request headers
    curl.setOpt(Curl.option.HTTPHEADER, this.headers);
    // set request data
    curl.setOpt(Curl.option.POSTFIELDS, JSON.stringify(this.data));
    // perform request
    curl.perform();

    var self = this;
        
    // on request end
    curl.on('end', function(responseCode, body, info){
        // default response code color
        var code = self.logger(responseCode, 'green.bgBlack', true);

        // 400 response code and up
        if(responseCode >= 400) {
            code = self.logger(responseCode + ' ' + info[0]['result']['reason'], 'yellow.bgBlack', true);

        // 500 response code and up
        } else if(responseCode >= 500) {
            code = self.logger(responseCode + ' ' + info[0]['result']['reason'], 'red.bgBlack', true);
        }

        self.logger(self.logger('Status Code', 'cyan', true) + ' : ' + code);
        self.logger(self.logger('Content Length', 'cyan', true) + ' : ' + self.logger(info[0]['Content-Length'], 'blue.bgBlack', true));
        self.logger(self.logger('Content Type', 'cyan', true) + ' : ' + self.logger(info['0']['Content-Type'], 'blue.bgBlack', true));
        self.logger(self.logger('Body', 'cyan', true) + ' : --');
        self.logger('');
        self.logger('# ---->');
        self.logger(body);
        self.logger('<---- #');
        self.logger('');

        // return response code and response body
        callback(responseCode, body, this.getInfo('TOTAL_TIME'));

        // close resource
        this.close();
    });
};

/**
 * Convert object to query string.
 *
 * @param  object
 * @return string
 */
request.toQueryString = function(object) {
    // set query
    var query       = '';
    // get query length
    var length      = this.objLength(object);
    // current index
    var index       = 0;
    // set separator
    var separator   = '&';

    // we have parameters?
    if(length > 0) {
        query += '?';
    }

    // iterate on each object
    for(var key in object) {
        // if we are on the last part
        if(++index == length) {
            separator = '';
        }

        // set query
        query += key + '=' + object[key] + separator;
    }

    return query;
};

/**
 * Returns object length.
 *
 * @param  object
 */
request.objLength = function(object) {
    var length = 0;

    for(var i in object) {
        length = length + 1;
    }

    return length;
};

module.exports = Request;