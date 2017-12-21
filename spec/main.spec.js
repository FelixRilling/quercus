"use strict";

const CONSTANTS = require("../package.json").constants;
const Quercus = require(`../${CONSTANTS.dirBase.output}/${
    CONSTANTS.js.namespace.file
}.common.js`);

describe("Empty", () => {
    const q = new Quercus();

    console.log(q);

    it("Size", () => {
        expect(q.size).toBe(0);
    });

    it("Has Nonexisting", () => {
        expect(q.hasPath(["foo"])).toBe(false);
    });
    it("Get Nonexisting", () => {
        expect(q.getPath(["foo"])).toBe(null);
    });
});

describe("Simple", () => {
    const q = new Quercus();

    q.setPath(["foo"], "bar");

    console.log(q);

    it("Size", () => {
        expect(q.size).toBe(1);
    });

    it("Has", () => {
        expect(q.hasPath(["foo"])).toBe(true);
    });
    it("Get", () => {
        expect(q.getPath(["foo"])).toBe("bar");
    });

    it("Has Nonexisting", () => {
        expect(q.hasPath(["foo", "bar"])).toBe(false);
    });
    it("Get Nonexisting", () => {
        expect(q.getPath(["foo", "bar"])).toBe(null);
    });
});
