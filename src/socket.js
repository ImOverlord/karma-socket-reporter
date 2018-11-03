const dgram = require("dgram");
const client = dgram.createSocket('udp4');

class Socket {

    constructor(config) {
        this.config = config;
    }

    resolveType(type) {
        return (this.config[type]);
    }

    send(msgType, msg) {
        let buff = new Buffer(JSON.stringify({
            'type': this.resolveType(msgType),
            'info': msg
        }));
        client.send(buff, this.config.port, this.config.host);
    }

}

module.exports = {
    Socket
}