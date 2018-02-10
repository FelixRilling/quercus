"use strict";

const Quercus = require("../dist/quercus.common");
const { arrUniq, randomItem } = require("lightdash");

const EPOCH_FACTOR = 10 ** 12;

const getRandomDatesArr = (sampleSizeMax = 0) =>
    arrUniq(
        new Array(sampleSizeMax).fill(null).map(() => {
            const date = new Date(Math.floor(Math.random() * EPOCH_FACTOR));

            return [
                [
                    date.getUTCFullYear(),
                    date.getUTCMonth() + 1,
                    date.getUTCDay() + 1
                ],
                Boolean(Math.round(Math.random()))
            ];
        })
    );

describe("Date 16 entries", () => {
    const dates = getRandomDatesArr(16);
    const q = new Quercus(dates);
    const date = randomItem(dates);

    it("Has item", () => {
        expect(q.hasPath(date[0])).toBe(true);
    });
    it("Get item", () => {
        expect(q.getPath(date[0])).toBe(date[1]);
    });
});

describe("Date 128 entries", () => {
    const dates = getRandomDatesArr(128);
    const q = new Quercus(dates);
    const date = randomItem(dates);

    it("Has item", () => {
        expect(q.hasPath(date[0])).toBe(true);
    });
    it("Get item", () => {
        expect(q.getPath(date[0])).toBe(date[1]);
    });
});
/*
describe("Date 1024 entries", () => {
    const dates = getRandomDatesArr(1024);
    const q = new Quercus(dates);
    const date = randomItem(dates);

    console.log([q, date]);

    it("Has item", () => {
        expect(q.hasPath(date[0])).toBe(true);
    });
    it("Get item", () => {
        expect(q.getPath(date[0])).toBe(date[1]);
    });
});

describe("Date 4096 entries", () => {
    const dates = getRandomDatesArr(4096);
    const q = new Quercus(dates);
    const date = randomItem(dates);

    it("Has item", () => {
        expect(q.hasPath(date[0])).toBe(true);
    });
    it("Get item", () => {
        expect(q.getPath(date[0])).toBe(date[1]);
    });
});
 */
