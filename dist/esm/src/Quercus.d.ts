import { PathArr } from "./path/PathArr";
import { PathEntryInitializer } from "./path/PathEntryInitializer";
import { Tree } from "./Tree";
/**
 * Quercus main class.
 *
 * @class
 * @since 1.0.0
 * @extends Map
 */
declare class Quercus<TKey, UValue> extends Map<TKey, UValue | Tree<TKey, UValue> | null> implements Tree<TKey, UValue> {
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
    constructor(pairArr?: PathEntryInitializer<TKey, UValue>);
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
    hasPath(path: PathArr<TKey>, quercusNodesAreTruthy?: boolean): boolean;
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
    getPath(path: PathArr<TKey>): Quercus<TKey, UValue> | UValue | null;
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
    setPath(path: PathArr<TKey>, val: any): Quercus<TKey, UValue> | null;
    isTree(val: any): val is Tree<TKey, UValue>;
    createSubTree(): Tree<TKey, UValue>;
}
export { Quercus };
//# sourceMappingURL=Quercus.d.ts.map