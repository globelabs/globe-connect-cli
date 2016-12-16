// require yargs
var yargs = require('yargs');
// require package configuration
var package = require('./package.json');
// require cli-color
var clc = require('cli-color');

yargs.usage('Usage: $0 <command> [args]')
    .command('sms', 'send an sms to the given subscriber / MSISDN number.')
    .command('binarysms', 'send a binary sms to the given subscruber / MSISDN number.')
    .command('location', 'get the subscribers location.')
    .command('payment', 'charge the given subscriber with the given amount.')
    .command('get-last-ref', 'get the last transaction reference id.')
    .command('subscr-bal', 'get the subscriber balance.')
    .command('subscr-reload-amt', 'get the subscriber reload amount.')
    .command('amax', 'send a reward / promo request.')
    .command('ussd-send', 'send a ussd session request.')
    .command('ussd-reply', 'send a ussd reply request.')
    .option('verbose', {
        describe : 'enable verbose logging.'
    })
    .option('version', {
        describe : 'show the current version.'
    })
    .option('help', {
        alias : 'h',
        describe : 'show list of available commands.'
    })
    .epilog('Globe Connect - Copyright 2016 - https://developer.globelabs.com.ph');

var argv = yargs.argv;

if(argv._.length == 0 && (argv.h || argv.help)) {
    log(package.description, 'blue');
    log('');

    yargs.showHelp();

    return;
}

if(argv.version) {
    log(package.description + ' v' + package.version, 'blue');
    log('');

    return;
}

var command = argv._.shift();
var options = null;

switch(command) {
    case 'sms' :
        log(package.description, 'blue');
        log('');

        options = require('yargs')
        .usage('Usage: $0 sms [args]')
        .option('a', {
            alias       : 'address',
            type        : 'string',
            demand      : true,
            describe    : 'subscriber address / msisdn.'
        })
        .option('m', {
            alias       : 'message',
            type        : 'string',
            demand      : true,
            describe    : 'message to be sent out to the given subscriber number.'
        })
        .option('s', {
            alias       : 'senderAddress',
            type        : 'string',
            demand      : true,
            describe    : 'sender address or the short code of your app.'
        })
        .option('t', {
            alias       : 'accessToken',
            type        : 'string',
            demand      : true,
            describe    : 'access token given acquired from Opt-in via SMS / Webform.'
        })
        .option('c', {
            alias       : 'clientCorrelator',
            type        : 'string',
            demand      : false,
            describe    : 'a key that uniquely identifies the sms.'
        })
        .help('h', 'show list of available options.')
        .alias('h', 'help')
        .argv;

        break;
    case 'binarysms' :
        log(package.description, 'blue');
        log('');

        options = require('yargs')
        .usage('Usage: $0 binarysms [args]')
        .option('a', {
            alias       : 'address',
            type        : 'string',
            demand      : true,
            describe    : 'subscriber address / msisdn.'
        })
        .option('m', {
            alias       : 'message',
            type        : 'string',
            demand      : true,
            describe    : 'message to be sent out to the given subscriber number.'
        })
        .option('s', {
            alias       : 'senderAddress',
            type        : 'string',
            demand      : true,
            describe    : 'sender address or the short code of your app.'
        })
        .option('t', {
            alias       : 'accessToken',
            type        : 'string',
            demand      : true,
            describe    : 'access token given acquired from Opt-in via SMS / Webform.'
        })
        .option('u', {
            alias       : 'userDataHeader',
            type        : 'string',
            demand      : true,
            describe    : 'user data header for binary message'
        })
        .option('d', {
            alias       : 'dataCodingScheme',
            type        : 'int',
            demand      : false,
            default     : 0,
            describe    : 'data coding scheme of the message'
        })
        .help('h', 'show list of available options.')
        .alias('h', 'help')
        .argv;

        break;
    case 'location' :
        log(package.description, 'blue');
        log('');

        options = require('yargs')
        .usage('Usage: $0 location [args]')
        .option('a', {
            alias       : 'address',
            type        : 'string',
            demand      : true,
            describe    : 'subscriber address / msisdn.'
        })
        .option('t', {
            alias       : 'accessToken',
            type        : 'string',
            demand      : true,
            describe    : 'access token given acquired from Opt-in via SMS / Webform.'
        })
        .option('c', {
            alias       : 'accuracy',
            type        : 'int',
            demand      : true,
            describe    : 'the preferred accuracy of the result, in metres.'
        })
        .help('h', 'show list of available options.')
        .alias('h', 'help')
        .argv;

        break;
    case 'payment' :
        log(package.description, 'blue');
        log('');

        options = require('yargs')
        .usage('Usage: $0 payment [args]')
        .option('t', {
            alias       : 'accessToken',
            type        : 'string',
            demand      : true,
            describe    : 'access token given acquired from Opt-in via SMS / Webform.'
        })
        .option('a', {
            alias       : 'amount',
            type        : 'float',
            demand      : true,
            describe    : 'amount to be charged.'
        })
        .option('d', {
            alias       : 'description',
            type        : 'string',
            demand      : true,
            describe    : 'payment description.'
        })
        .option('e', {
            alias       : 'endUserId',
            type        : 'string',
            demand      : true,
            describe    : 'subcriber address / msisdn.'
        })
        .option('r', {
            alias       : 'referenceCode',
            type        : 'string',
            demand      : true,
            describe    : 'unique transaction identifier in the format of [4-digit-shortcode]xxxxxxx.'
        })
        .option('s', {
            alias       : 'status',
            type        : 'string',
            demand      : true,
            describe    : 'indicates the desired resource state e.g "Charged."'
        })
        .help('h', 'show list of available options.')
        .alias('h', 'help')
        .argv;

        break;
    case 'get-last-ref' :
        log(package.description, 'blue');
        log('');

        options = require('yargs')
        .usage('Usage: $0 get-last-ref [args]')
        .option('i', {
            alias       : 'appId',
            type        : 'string',
            demand      : true,
            describe    : 'your application\'s API id.'
        })
        .option('s', {
            alias       : 'appSecret',
            type        : 'string',
            demand      : true,
            describe    : 'your application\'s API secret.'
        })
        .help('h', 'show list of available options.')
        .alias('h', 'help')
        .argv;

        break;
    case 'subscr-bal' :
        log(package.description, 'blue');
        log('');

        options = require('yargs')
        .usage('Usage: $0 subscr-bal [args]')
        .option('a', {
            alias       : 'address',
            type        : 'string',
            demand      : true,
            describe    : 'subscriber address / msisdn.'
        })
        .option('t', {
            alias       : 'accessToken',
            type        : 'string',
            demand      : true,
            describe    : 'access token given acquired from Opt-in via SMS / Webform.'
        })
        .help('h', 'show list of available options.')
        .alias('h', 'help')
        .argv;

        break;
    case 'subscr-reload-amt' :
        log(package.description, 'blue');
        log('');

        options = require('yargs')
        .usage('Usage: $0 subscr-reload-amt [args]')
        .option('a', {
            alias       : 'address',
            type        : 'string',
            demand      : true,
            describe    : 'subscriber address / msisdn.'
        })
        .option('t', {
            alias       : 'accessToken',
            type        : 'string',
            demand      : true,
            describe    : 'access token given acquired from Opt-in via SMS / Webform.'
        })
        .help('h', 'show list of available options.')
        .alias('h', 'help')
        .argv;

        break;
    case 'amax' :
        log(package.description, 'blue');
        log('');

        options = require('yargs')
        .usage('Usage: $0 amax [args]')
        .option('i', {
            alias       : 'appId',
            type        : 'string',
            demand      : true,
            describe    : 'your application\'s API id.'
        })
        .option('s', {
            alias       : 'appSecret',
            type        : 'string',
            demand      : true,
            describe    : 'your application\'s API secret.'
        })
        .option('t', {
            alias       : 'rewardsToken',
            type        : 'string',
            demand      : true,
            describe    : 'rewards token.'
        })
        .option('p', {
            alias       : 'promo',
            type        : 'string',
            demand      : true,
            describe    : 'promo code.'
        })
        .option('a', {
            alias       : 'address',
            type        : 'string',
            demand      : true,
            describe    : 'subscriber number / msisdn.'
        })
        .help('h', 'show list of available options.')
        .alias('h', 'help')
        .argv;

        break;
    case 'ussd-send' :
        log(package.description, 'blue');
        log('');

        options = require('yargs')
        .usage('Usage: $0 ussd-send [args]')
        .option('m', {
            alias       : 'message',
            type        : 'string',
            demand      : true,
            describe    : 'message to be sent via ussd.'
        })
        .option('a', {
            alias       : 'address',
            type        : 'string',
            demand      : true,
            describe    : 'subcriber number / msisdn.'
        })
        .option('s', {
            alias       : 'senderAddress',
            type        : 'string',
            demand      : true,
            describe    : 'sender address or the short code of your app.'
        })
        .option('f', {
            alias       : 'flash',
            type        : 'boolean',
            demand      : true,
            describe    : 'sender address or the short code of your app.'
        })
        .option('t', {
            alias       : 'accessToken',
            type        : 'string',
            demand      : true,
            describe    : 'access token given acquired from Opt-in via SMS / Webform.'
        })
        .help('h', 'show list of available options.')
        .alias('h', 'help')
        .argv;

        break;
    case 'ussd-reply' :
        log(package.description, 'blue');
        log('');

        options = require('yargs')
        .usage('Usage: $0 ussd-reply [args]')
        .option('m', {
            alias       : 'message',
            type        : 'string',
            demand      : true,
            describe    : 'message to be sent via ussd.'
        })
        .option('a', {
            alias       : 'address',
            type        : 'string',
            demand      : true,
            describe    : 'subcriber number / msisdn.'
        })
        .option('s', {
            alias       : 'senderAddress',
            type        : 'string',
            demand      : true,
            describe    : 'sender address or the short code of your app.'
        })
        .option('f', {
            alias       : 'flash',
            type        : 'boolean',
            demand      : true,
            describe    : 'sender address or the short code of your app.'
        })
        .option('i', {
            alias       : 'sessionId',
            type        : 'string',
            demand      : true,
            describe    : 'ussd session id.'
        })
        .option('t', {
            alias       : 'accessToken',
            type        : 'string',
            demand      : true,
            describe    : 'access token given acquired from Opt-in via SMS / Webform.'
        })
        .help('h', 'show list of available options.')
        .alias('h', 'help')
        .argv;

        break;
    default :
        log(package.description, 'blue');
        log('');

        yargs.showHelp();

        return;
}

// ##### COMMAND EXECUTION #####
log('Executing Process ' + log(command.toUpperCase(), 'cyan.underline', true, true) + '.', null, false, true);
log('');
log('Arguments : ');

for(var i in options) {
    if(i.length === 1
    || i === '$0') {
        continue;
    }

    log('   - ' + log(i, 'magenta', true) + ' : ' + log(options[i], 'blue', true));
}

log('');

// build the path
var index = require('./lib/' + command);

// initialize
index(options, function(responseCode, body, totalTime) {
    // get the action
    action = log(command.toUpperCase(), 'cyan.underline', true, true);

    // default response code color
    var code = log(responseCode, 'green.bgBlack', true, true);

    // 400 response code and up
    if(responseCode >= 400) {
        code = log(responseCode, 'yellow.bgBlack', true, true);

    // 500 response code and up
    } else if(responseCode >= 500) {
        code = log(responseCode, 'red.bgBlack', true, true);
    }

    console.log('Command ' + action + ' has been successfully executed. \n\nStatus: ' + code);
    console.log('Total time: ' + totalTime);
}, log);

// default logger
function log(message, option, ret, force) {
    if(options && !options.verbose && !force) {
        return false;
    }

    if(!option || option.length === 0) {
        console.log(message);
        return true;
    }

    option = option.split('.');

    var fn = clc;

    for(var i in option) {
        fn = fn[option[i]];
    }

    if(ret) {
        return fn(message);
    }

    console.log(fn(message));

    return true;
};
