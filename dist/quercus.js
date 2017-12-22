var Quercus = (function () {
'use strict';

/**
 * Utility class to resolve paths
 *
 * @private
 * @since 1.0.0
 * @param {Quercus} target
 * @param {any[]} path
 * @param {boolean} [createMissing=false]
 * @returns {object}
 */
const resolvePath = (target, path, createMissing = false) => {
    /**
     * Is assigned to input as default and only changed when the next sub-Quercus is found
     */
    let targetNew = target;
    let key;
    let success = true;
    if (path.length === 1) {
        key = path[0];
    } else {
        if (target.has(path[0]) && Quercus.isQuercus(target.get(path[0]))) {
            targetNew = target.get(path[0]);
        } else {
            if (createMissing) {
                targetNew = new Quercus();
                target.set(path[0], targetNew);
            } else {
                success = false;
            }
        }
        key = path[1];
    }
    if (path.length > 2 && success) {
        return resolvePath(targetNew, path.slice(1), createMissing);
    } else {
        return { success, key, target: targetNew };
    }
};
/**
 * Quercus main class
 *
 * @class
 * @since 1.0.0
 * @extends Map
 */
class Quercus extends Map {
    /**
     * Checks if a value is a Quercus instance
     *
     * @static
     * @since 1.0.0
     * @param {any} val
     * @returns {boolean}
     * @example
     * const q = new Quercus([["foo", bar], 5]);
     *
     * Quercus.isQuercus(q) // true
     * Quercus.isQuercus(q.getPath(["foo"])) // true
     * Quercus.isQuercus("foo") // false
     */
    static isQuercus(val) {
        return val instanceof Quercus;
    }
    /**
     * Quercus main class constructor
     *
     * @constructor
     * @since 1.0.0
     * @param {Array<Array<any>, any>} [pairArr=[]] Optional array of path-value pairs to set
     * @example
     * const q = new Quercus(); // Empty tree
     * const q2 = new Quercus([["foo", bar], 5]); // Tree initalized with a path-value pair
     */
    constructor(pairArr = []) {
        super();
        pairArr.forEach(pair => this.setPath(pair[0], pair[1]));
    }
    /**
     * Checks if a given path exists
     *
     * @since 1.0.0
     * @param {any[]} path
     * @param {boolean} [quercusNodesAreTruthy=false]
     * @returns {boolean}
     * @example
     * const q = new Quercus([
     *       [["foo", "bar"], 5],
     *       [["foo", "bizz"], 12],
     *       [["bar", "fazz"], 560]
     *   ]);
     *
     * q.hasPath(["foo", "bar"]); // true
     * q.hasPath(["foo"]); // false
     * q.hasPath(["foo"], false); // true
     */
    hasPath(path, quercusNodesAreTruthy = false) {
        if (path.length === 0) {
            return quercusNodesAreTruthy;
        }
        const resolved = resolvePath(this, path);
        if (resolved.success && resolved.target.has(resolved.key)) {
            if (!quercusNodesAreTruthy) {
                return !Quercus.isQuercus(resolved.target.get(resolved.key));
            }
            return true;
        }
        return false;
    }
    /**
     * Returns value of a given path.
     * If the path could not be found, null is returned
     *
     * @since 1.0.0
     * @param {any[]} path
     * @returns {any|null}
     * @example
     * const q = new Quercus([
     *       [["foo", "bar"], 5],
     *       [["foo", "bizz"], 12],
     *       [["bar", "fazz"], 560]
     *   ]);
     *
     * q.getPath(["foo", "bar"]); // 5
     * q.getPath(["bar"]); // Quercus{"fazz"=>560}
     * q.getPath(["lorem"]); // null
     */
    getPath(path) {
        if (path.length === 0) {
            return this;
        }
        const resolved = resolvePath(this, path);
        return resolved.success && resolved.target.has(resolved.key) ? resolved.target.get(resolved.key) : null;
    }
    /**
     * Sets value of a given path.
     * If the given path is empty, null is returned.
     * If the value was set successfully, the value's Node is returned
     *
     * @since 1.0.0
     * @param {any[]} path
     * @param {any} val
     * @returns {Quercus|null}
     * @example
     * const q = new Quercus();
     *
     * q.setPath(["foo", "bar"], 5); // Quercus{"bar"=>5}
     * q.setPath(["bar", "fazz"], 560); // Quercus{"fazz"=>560}
     * q.setPath([], "foo"); // null
     */
    setPath(path, val) {
        if (path.length === 0) {
            return null;
        }
        const resolved = resolvePath(this, path, true);
        resolved.target.set(resolved.key, val);
        return resolved.target;
    }
}

return Quercus;

}());
