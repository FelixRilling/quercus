import { isInstanceOf } from "lightdash";
import {
    quercusPath,
    quercusPathEntry,
    quercusPathEntryInitializer,
    resolvePath
} from "./lib/path";

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
     * @param {any} val value to check.
     * @returns {boolean} if the value is a Quercus instance.
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
        return isInstanceOf(val, Quercus);
    }
    /**
     * Quercus main class constructor.
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
    public constructor(pairArr: quercusPathEntryInitializer = []) {
        super();

        pairArr.forEach((pair: quercusPathEntry) =>
            this.setPath(pair[0], pair[1])
        );
    }
    /**
     * Checks if a given path exists.
     *
     * @since 1.0.0
     * @param {any[]} path path to check.
     * @param {boolean} [quercusNodesAreTruthy=false] if nodes should be considered t be truthy.
     * @returns {boolean} if the given path exists.
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
    public hasPath(path: quercusPath, quercusNodesAreTruthy = false): boolean {
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
     * @param {any[]} path path to get.
     * @returns {any|null} value of the node, or null if it is not found.
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
    public getPath(path: quercusPath): any | null {
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
     * @param {any[]} path path to set.
     * @param {any} val value to set.
     * @returns {Quercus|null} the node that was set on, or null if it could not be set.
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
    public setPath(path: quercusPath, val: any): Quercus | null {
        if (path.length === 0) {
            return null;
        }

        const { target, key } = resolvePath(this, path, true);

        target.set(key, val);

        return target;
    }
}

export { Quercus };
