import { isInstanceOf } from "lightdash";
import { IQuercus, IResolvedPath } from "./interfaces";
import {
    quercusPath,
    quercusPathEntry,
    quercusPathEntryInitializer
} from "./types";

/**
 * Utility class to resolve paths.
 *
 * @private
 * @since 1.0.0
 * @param {Quercus} target
 * @param {any[]} path
 * @param {boolean} [createMissing=false]
 * @returns {object}
 * @example
 * const q = new Quercus([["foo", "bar"], 5]);
 *
 * // => {target: Quercus{"bar"=> 5}, key: "bar", success: true}
 * resolvePath(q, ["foo", "bar"])
 */
const resolvePath = (
    targetOld: Quercus,
    path: any[],
    createMissing: boolean = false
): IResolvedPath => {
    let target = targetOld;
    let key: any = path[0];
    let success = true;

    if (path.length > 1) {
        const sub = targetOld.get(key);

        /**
         * Flow:
         * Does the key exist on the target?
         *     true  -> assign it
         *     false ->
         *         Is createMissing truthy?
         *             true  -> Create a new Quercus; assign it and set it on the parent
         *             false -> declare unsuccessful, abort
         */
        if (targetOld.has(key) && Quercus.isQuercus(sub)) {
            target = sub;
        } else {
            if (createMissing) {
                target = new Quercus();
                targetOld.set(key, target);
            } else {
                success = false;
            }
        }

        // Assign the next key
        key = path[1];
    }

    if (path.length > 2 && success) {
        return resolvePath(target, path.slice(1), createMissing);
    }

    return { target, key, success };
};

/**
 * Quercus main class.
 *
 * @class
 * @since 1.0.0
 * @extends Map
 */
class Quercus extends Map<any, Quercus | any> implements IQuercus {
    /**
     * Checks if a value is a Quercus instance.
     *
     * @static
     * @since 1.0.0
     * @param {any} val
     * @returns {boolean}
     * @example
     * const q = new Quercus([["foo", "bar"], 5]);
     *
     * // => true
     * Quercus.isQuercus(q)
     *
     * // => true
     * Quercus.isQuercus(q.getPath(["foo"]))
     *
     * // => true
     * Quercus.isQuercus("foo") // false
     */
    public static isQuercus(val: any): boolean {
        return isInstanceOf(val, Quercus);
    }
    /**
     * Quercus main class constructor.
     *
     * @constructor
     * @since 1.0.0
     * @param {Array<Array<any>, any>} [pairArr=[]] Optional array of path-value pairs to set
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
     * // => true
     * q.hasPath(["foo", "bar"]);
     *
     * // => false
     * q.hasPath(["foo"]); // false
     *
     * // => true
     * q.hasPath(["foo"], false);
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
     * // => 5
     * q.getPath(["foo", "bar"]);
     *
     * // =>  Quercus{"fazz"=> 560}
     * q.getPath(["bar"]);
     *
     * // => null
     * q.getPath(["lorem"]);
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
     * @param {any[]} path
     * @param {any} val
     * @returns {Quercus|null}
     * @example
     * const q = new Quercus();
     *
     *  // => Quercus{"bar"=>5}
     * q.setPath(["foo", "bar"], 5);
     *
     * // => Quercus{"fazz"=>560}
     * q.setPath(["bar", "fazz"], 560);
     *
     * // => null
     * q.setPath([], "foo");
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

export default Quercus;
