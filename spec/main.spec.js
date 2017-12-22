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

describe("Normal", () => {
    const q = new Quercus();

    q.setPath(["foo", "bar"], 5);
    q.setPath(["foo", "bizz", "buzz"], 12);
    q.setPath(["bar", "fazz"], 560);
    q.setPath(["bar", "boo", "baa", "bii", "bee"], 9);

    console.log(q);

    it("Size", () => {
        expect(q.size).toBe(2);
    });

    it("Has QuercusNode", () => {
        expect(q.hasPath(["foo", "bizz"])).toBe(false);
    });
    it("Has QuercusNode quercusNodesAreTruthy=true", () => {
        expect(q.hasPath(["foo", "bizz"], true)).toBe(true);
    });
    it("Get QuercusNode", () => {
        expect(Quercus.isQuercusNode(q.getPath(["foo", "bizz"]))).toBe(true);
    });

    it("Has", () => {
        expect(q.hasPath(["foo", "bizz", "buzz"])).toBe(true);
    });
    it("Get", () => {
        expect(q.getPath(["foo", "bizz", "buzz"])).toBe(12);
    });

    it("Has Deep", () => {
        expect(q.hasPath(["bar", "boo", "baa", "bii", "bee"])).toBe(true);
    });
    it("Get Deep", () => {
        expect(q.getPath(["bar", "boo", "baa", "bii", "bee"])).toBe(9);
    });

    it("Has Nonexisting", () => {
        expect(q.hasPath(["foo", "lorem"])).toBe(false);
    });
    it("Get Nonexisting", () => {
        expect(q.getPath(["foo", "lorem"])).toBe(null);
    });

    it("Has Nonexisting Deep", () => {
        expect(q.hasPath(["bar", "boo", "baa", "a", "b", "c"])).toBe(false);
    });
    it("Get Nonexisting Deep", () => {
        expect(q.getPath(["bar", "boo", "baa", "a", "b", "c"])).toBe(null);
    });
});
