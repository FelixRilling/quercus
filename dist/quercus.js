var Quercus = (function () {
'use strict';

/**
 * TreeLayer class
 *
 * @class
 * @extends Map
 */
const TreeLayer = class extends Map {
  /**
   * Constructor for TreeLayer
   *
   * @constructor
   * @param {any} [data=null]
   */
  constructor(data = null) {
    super();

    this.data = data;
  }
};

/**
 * Resolves a path of keys in a tree
 *
 * @param {TreeLayer} treeLayer
 * @param {Array<string>} path
 * @param {boolean} [createMissingLayers=false]
 * @param {number} [depth=1]
 * @returns {object}
 */
const resolvePath = (treeLayer, path, createMissingLayers = false, depth = 1) => {
    const currentKey = path[0];
    let result = {
        depth,
        target: treeLayer
    };

    if (path.length === 0) {
        return result;
    }

    if (treeLayer.has(currentKey)) {
        result.target = treeLayer.get(currentKey);
    } else {
        if (createMissingLayers) {
            result.target = new TreeLayer();
            treeLayer.set(currentKey, result.target);
        } else {
            result.target = null;

            return result;
        }
    }

    /**
     * If the end of the path is not reached, continue searching inside result
     */
    if (path.length > 1) {
        result = resolvePath(result.target, path.slice(1), createMissingLayers, depth + 1);
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
  configurable
});

/**
 * Quercus main class
 *
 * @class
 */
const Quercus = class {
    /**
     * Quercus main class constructor
     *
     * @constructor
     * @param {any} [data=null]
     */
    constructor(data) {
        this.tree = new TreeLayer(data);

        objDefineProperty(this, "depth", 0, false);
    }
    /**
     * Check if a given path exists
     *
     * @param {Array<string>} [path=[]]
     * @param {boolean} [allowEmpty=true] If a layer without data and children should be counted as existing
     * @returns {boolean}
     */
    has(path = [], allowEmpty = true) {
        const { target } = resolvePath(this.tree, path);

        if (target !== null) {
            return allowEmpty ? true : target.data !== null || target.size !== 0;
        } else {
            return false;
        }
    }
    /**
     * Return value of a path
     *
     * @param {Array<string>} [path=[]]
     * @param {boolean} [returnData=true] If only the data of a layer rather than the layer itself should be returned
     * @returns {any|TreeLayer}
     */
    get(path = [], returnData = true) {
        const { target } = resolvePath(this.tree, path);

        return returnData ? target.data : target;
    }
    /**
     * Sets data of a path
     *
     * @param {Array<string>} [path=[]]
     * @param {any} [data=null]
     * @returns {boolean}
     */
    set(path = [], data) {
        const { target, depth } = resolvePath(this.tree, path, true);

        target.data = data;
        this.depth = depth;

        return true;
    }
};

return Quercus;

}());
