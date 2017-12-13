'use strict';

const TreeLayer = class extends Map {
    constructor(data = null) {
        super();

        this.data = data;
    }
};

const resolvePath = (
    treeLayer,
    path = [],
    createMissingLayers = false,
    depth = 1
) => {
    if (path.length === 0) {
        return null;
    }
    const currentKey = path[0];
    let result = {
        depth,
        target: null
    };

    if (treeLayer.has(currentKey)) {
        result.target = treeLayer.get(currentKey);
    } else {
        if (createMissingLayers) {
            result.target = new TreeLayer();
            treeLayer.set(currentKey, result.target);
        } else {
            return null;
        }
    }

    if (path.length > 1) {
        result = resolvePath(
            result.target,
            path.slice(1),
            createMissingLayers,
            depth + 1
        );
    }

    return result;
};

/**
 * Checks if the value has a certain type-string
 *
 * @function isTypeOf
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @param {string} type
 * @returns {boolean}
 * @example
 * // returns true
 * isTypeOf({}, "object")
 * isTypeOf([], "object")
 * isTypeOf("foo", "string")
 *
 * @example
 * // returns false
 * isTypeOf("foo", "number")
 */
/**
 * Adds a property to an object with optional custom flags
 *
 * `Object.defineProperty` shorthand
 *
 * @function objDefineProperty
 * @memberof Object
 * @since 2.8.0
 * @param {Object} obj
 * @param {string} key
 * @param {any} val
 * @param {boolean} [enumerable=true]
 * @param {boolean} [writable=true]
 * @param {boolean} [configurable=true]
 * @returns {Object}
 * @example
 * // returns a = {"foo": 1}
 * const a={};
 * objDefineProperty(a, "foo", 1)
 */
const objDefineProperty = (obj, key, val, enumerable = true, writable = true, configurable = true) => Object.defineProperty(obj, key, {
    value: val,
    enumerable,
    writable,
    configurable,
});

const Quercus = class {
    constructor(data) {
        this.tree = new TreeLayer(data);

        objDefineProperty(this, "depth", 0, false);
    }
    has(path) {
        return resolvePath(this.tree, path) !== null;
    }
    get(path, returnData = true) {
        const { target } = resolvePath(this.tree, path);

        return returnData ? target.data : target;
    }
    set(path, data = null) {
        const { target, depth } = resolvePath(this.tree, path, true);

        if (target !== null) {
            target.data = data;
            this.depth = depth;

            return true;
        } else {
            return false;
        }
    }
};

module.exports = Quercus;
