import { IQuercus } from "./interfaces";
import { quercusPath, quercusPathEntryInitializer } from "./types";
/**
 * Quercus main class.
 *
 * @class
 * @since 1.0.0
 * @extends Map
 */
declare class Quercus extends Map<any, Quercus | any> implements IQuercus {
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
    static isQuercus(val: any): boolean;
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
    constructor(pairArr?: quercusPathEntryInitializer);
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
    hasPath(path: quercusPath, quercusNodesAreTruthy?: boolean): boolean;
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
    getPath(path: quercusPath): any | null;
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
    setPath(path: quercusPath, val: any): Quercus | null;
}
export default Quercus;
