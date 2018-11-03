/*
** config.js
** config handler
** @ImOverlord
*/

const config = {
    host: '127.0.0.1',
    port: '4444',
    ok: 'ok',
    ko: 'ko',
    started: 'start',
    skip: 'skip'
};

function configHandler(newConfig) {
    Object.keys(config).forEach(key => {
        if (newConfig.hasOwnProperty(key))
            config[key] = newConfig[key];
    });
    return (config);
}

module.exports = {
    config,
    configHandler
};