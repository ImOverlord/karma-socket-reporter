const chai = require('chai');
const expect = chai.expect;

const config = require("../config");

describe("Config: ", () => {

    it("Update config with empty new config", () => {

        const newConfig = {};
        const updateConfig = config.configHandler(newConfig);

        expect(updateConfig).to.equal(config.config);
    });

    it("Update config with new port", () => {

        const newConfig = {
            port: '4441'
        };
        let expectedConfig = Object.assign({}, config.config);
        expectedConfig.port = '4441';
        const updatedConfig = config.configHandler(newConfig);

        expect(updatedConfig.port).to.equal(expectedConfig.port);
    });

});