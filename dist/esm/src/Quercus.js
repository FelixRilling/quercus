import { resolvePath } from "./path/resolvePath";
/**
 * Quercus main class.
 *
 * @class
 * @since 1.0.0
 * @extends Map
 */
class Quercus extends Map {
    /**
     * Quercus main constructor.
     *
     * @constructor
     * @since 1.0.0
     * @param {Array<Array<any>, any>} [pairArr=[]] Optional array of path-value pairs to init.
     * @example
     * // Empty tree
     * const q = new Quercus();
     *
     * // Tree initialized with a path-value pair
     * const q2 = new Quercus([["foo", bar], 5]);
     */
    constructor(pairArr = []) {
        super();
        for (const [path, val] of pairArr) {
            this.setPath(path, val);
        }
    }
    /**
     * Checks if a given path exists.
     *
     * @since 1.0.0
     * @param {any[]} path Path to check.
     * @param {boolean} [quercusNodesAreTruthy=false] If nodes should be considered to be truthy.
     * @returns {boolean} If the given path exists.
     * @example
     * const q = new Quercus([
     *       [["foo", "bar"], 5],
     *       [["foo", "bizz"], 12],
     *       [["bar", "fazz"], 560]
     *   ]);
     *
     * q.hasPath(["foo", "bar"]);
     * // => true
     *
     * q.hasPath(["foo"]);
     * // => false
     *
     * q.hasPath(["foo"], true);
     * // => true
     */
    hasPath(path, quercusNodesAreTruthy = false) {
        if (path.length === 0) {
            return quercusNodesAreTruthy;
        }
        const { target, key, success } = resolvePath(this, path);
        if (success && target.has(key)) {
            if (!quercusNodesAreTruthy) {
                return !this.isTree(target.get(key));
            }
            return true;
        }
        return false;
    }
    /**
     * Returns value of a given path.
     *
     * If the path could not be found, null is returned.
     *
     * @since 1.0.0
     * @param {any[]} path Path to get.
     * @returns {any|null} Value of the node, or null if it is not found.
     * @example
     * const q = new Quercus([
     *       [["foo", "bar"], 5],
     *       [["foo", "bizz"], 12],
     *       [["bar", "fazz"], 560]
     *   ]);
     *
     * q.getPath(["foo", "bar"]);
     * // => 5
     *
     * q.getPath(["bar"]);
     * // => Quercus{"fazz": 560}
     *
     * q.getPath(["lorem"]);
     * // => null
     */
    getPath(path) {
        if (path.length === 0) {
            return this;
        }
        const { target, key, success } = resolvePath(this, path);
        if (success && target.has(key)) {
            return target.get(key);
        }
        return null;
    }
    /**
     * Sets value of a given path.
     *
     * If the given path is empty, null is returned.
     * If the value was set successfully, the value's Node is returned.
     *
     * @since 1.0.0
     * @param {any[]} path Path to set.
     * @param {any} val Value to set.
     * @returns {Quercus|null} Node that was set on, or null if it could not be set.
     * @example
     * const q = new Quercus();
     *
     * q.setPath(["foo", "bar"], 5);
     * // => Quercus{"bar": 5}
     *
     * q.setPath(["bar", "fazz"], 560);
     * // => Quercus{"fazz": 560}
     *
     * q.setPath([], "foo");
     * // => null
     */
    setPath(path, val) {
        if (path.length === 0) {
            return null;
        }
        const { target, key } = resolvePath(this, path, true);
        target.set(key, val);
        return target;
    }
    isTree(val) {
        return val instanceof Quercus;
    }
    createSubTree() {
        return new Quercus();
    }
}
export { Quercus };
//# sourceMappingURL=Quercus.js.map