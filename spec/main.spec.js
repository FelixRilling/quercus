"use strict";

const CONSTANTS = require("../package.json").constants;
const myLib = require(`../${CONSTANTS.dirBase.output}/${CONSTANTS.js.namespace.file}.common.js`);

describe("Main test", function () {
    it("Normal case", function () {
        expect(myLib.add(1, 1)).toBe(2);
    });
});
