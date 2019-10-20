import { PathArr } from "./path/PathArr";
import { PathEntry } from "./path/PathEntry";
import { PathEntryInitializer } from "./path/PathEntryInitializer";
import { resolvePath } from "./path/resolvePath";

/**
 * Quercus main class.
 *
 * @class
 * @since 1.0.0
 * @extends Map
 */
class Quercus extends Map<any, Quercus | any> {
    /**
     * Checks if a value is a Quercus instance.
     *
     * @static
     * @since 1.0.0
     * @param {any} val Value to check.
     * @returns {boolean} If the value is a Quercus instance.
     * @example
     * const q = new Quercus([["foo", "bar"], 5]);
     *
     * Quercus.isQuercus(q)
     * // => true
     *
     * Quercus.isQuercus(q.getPath(["foo"]))
     * // => true
     *
     * Quercus.isQuercus("foo")
     * // => false
     */
    public static isQuercus(val: any): boolean {
        return val instanceof Quercus;
    }

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
    public constructor(pairArr: PathEntryInitializer = []) {
        super();

        pairArr.forEach((pair: PathEntry) => this.setPath(pair[0], pair[1]));
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
    public hasPath(path: PathArr, quercusNodesAreTruthy = false): boolean {
        if (path.length === 0) {
            return quercusNodesAreTruthy;
        }

        const { target, key, success } = resolvePath(this, path);

        if (success && target.has(key)) {
            if (!quercusNodesAreTruthy) {
                return !Quercus.isQuercus(target.get(key));
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
    public getPath(path: PathArr): any | null {
        if (path.length === 0) {
            return this;
        }

        const { target, key, success } = resolvePath(this, path);

        return success && target.has(key) ? target.get(key) : null;
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
    public setPath(path: PathArr, val: any): Quercus | null {
        if (path.length === 0) {
            return null;
        }
        const { target, key } = resolvePath(this, path, true);

        target.set(key, val);

        return target;
    }
}

export { Quercus };
