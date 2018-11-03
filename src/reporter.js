const process = require("process");
const configHandler = require("./config").configHandler;
const SocketLib = require("./socket");

const SocketReporter = function(baseReporterDecorator, config, logger, formatError) {

    const log = logger.create('reporter.socket');
    const _config = configHandler(config.SocketReporter || {});
    const socket = new SocketLib.Socket(_config);
    baseReporterDecorator(this);

    this.logBeautifier = function(logs) {
        var _logs = [];
        logs.forEach(log => {
            const _log = formatError(log);
            _logs.push(_log);
        })
        return (_logs);
    }


    this.onRunStart = function(browsers) {
        socket.send('started', 'Test Suit started');
    };

    this.onBrowserStart = function(browser) {
        //Not yet implemeneted
    };

    this.specSuccess = function(browser, result) {
        const res = this.logBeautifier(result.log);
        socket.send('ok', {name: result.description, msg: res});
    }
    this.specFailure = function(browser, result) {
        const res = this.logBeautifier(result.log);
        socket.send('ko', {name: result.description, msg: res});
    };
    this.specSkipped = function(browser, result) {
        const res = this.logBeautifier(result.log);
        socket.send('skip', {name: result.description, msg: res});
    }

    this.onSpecComplete = function(browser, result) {
        if (result.skipped) {
            this.specSkipped(browser, result);
        } else if (result.success) {
            this.specSuccess(browser, result);
        } else {
            this.specFailure(browser, result);
        }
    };
};

SocketReporter.$inject = ['baseReporterDecorator', 'config', 'logger', 'formatError']

module.exports = {
    'reporter:socket': ['type', SocketReporter]
};