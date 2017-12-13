'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Add two numbers
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
const add = (a, b) => a + b;

const PI = Math.PI;

/**
 * Add Pi to a number
 *
 * @param {number} a
 * @returns {number}
 */
const addPi = a => add(a, PI);

exports.add = add;
exports.addPi = addPi;
