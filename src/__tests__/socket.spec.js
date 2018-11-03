const chai = require('chai');
const expect = chai.expect;

const socketLib = require("../socket").Socket;
const config = require("../config").config;
const dgram = require("dgram");

describe("Socket: ", () => {
    let socket;
    let server;

    beforeEach(() => {
        socket = new socketLib(config);
    });

    it("Should resolve msg type - started", () => {
        const type = 'started';
        const expected ='start';
        const result = socket.resolveType(type);

        expect(result).to.equal(expected);
    });

    before(function(done) {

        server = dgram.createSocket('udp4');
        server.bind(config.port, config.host);

        server.on('listening',function(){
            done();
        });
    });

    it("Should send event", (done) => {

        socket.send('ok', '');
        server.on('message', (msg, info) => {
            msg = JSON.parse(msg);
            expect(msg.type).to.equal('ok');
            expect(msg.info).to.equal('');
            done();
        });
    });

    after(() => {
        server.close();
    })

    afterEach(() => {
        socket = null;
    });
})