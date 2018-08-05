var Quercus = (function () {
    'use strict';

    /**
     * Checks if the value has a certain type-string.
     *
     * @function isTypeOf
     * @memberof Is
     * @since 1.0.0
     * @param {any} val
     * @param {string} type
     * @returns {boolean}
     * @example
     * isTypeOf({}, "object")
     * // => true
     *
     * isTypeOf([], "object")
     * // => true
     *
     * isTypeOf("foo", "string")
     * // => true
     *
     * @example
     * isTypeOf("foo", "number")
     * // => false
     */

    /**
     * Checks if the value is an instance of a target constructor.
     *
     * @function isInstanceOf
     * @memberof Is
     * @since 1.0.0
     * @param {any} val
     * @param {Class} target
     * @returns {boolean}
     * @example
     * isInstanceOf({}, Object)
     * // => true
     *
     * isInstanceOf([], Object)
     * // => true
     *
     * isInstanceOf([], Array)
     * // => true
     *
     * @example
     * isInstanceOf({}, Array)
     * // => false
     *
     * isInstanceOf([], Map)
     * // => false
     */
    const isInstanceOf = (val, target) => val instanceof target;

    /**
     * Resolves path through Quercus instances.
     *
     * @private
     * @since 1.0.0
     * @param {Quercus} targetOld starting target for resolving.
     * @param {any[]} path path to resolve.
     * @param {boolean} [createMissing=false] if requested instances should be created if they don't exist.
     * @returns {object} resolved path object.
     * @example
     * const q = new Quercus([["foo", "bar"], 5]);
     *
     * resolvePath(q, ["foo", "bar"])
     * // => {target: Quercus{"bar": 5}, key: "bar", success: true}
     */
    const resolvePath = (targetOld, path, createMissing = false) => {
        let target = targetOld;
        let key = path[0];
        let success = true;
        if (path.length > 1) {
            const sub = targetOld.get(key);
            /**
             * Does the key exist on the target?
             *     true  -> assign it
             *     false ->
             *         Is createMissing truthy?
             *             true  -> Create a new Quercus; assign it and set it on the parent
             *             false -> declare unsuccessful, abort
             */
            if (targetOld.has(key) && Quercus.isQuercus(sub)) {
                target = sub;
            }
            else {
                if (createMissing) {
                    target = new Quercus();
                    targetOld.set(key, target);
                }
                else {
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
    class Quercus extends Map {
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
        static isQuercus(val) {
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
        constructor(pairArr = []) {
            super();
            pairArr.forEach((pair) => this.setPath(pair[0], pair[1]));
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
        hasPath(path, quercusNodesAreTruthy = false) {
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
        getPath(path) {
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
        setPath(path, val) {
            if (path.length === 0) {
                return null;
            }
            const { target, key } = resolvePath(this, path, true);
            target.set(key, val);
            return target;
        }
    }

    return Quercus;

}());
//# sourceMappingURL=quercus.js.map
