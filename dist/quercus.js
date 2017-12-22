var Quercus = (function () {
'use strict';

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
 * Checks if the value is an instance of a target constructor
 *
 * @function isInstanceOf
 * @memberof Is
 * @since 1.0.0
 * @param {any} val
 * @param {Class} target
 * @returns {boolean}
 * @example
 * // returns true
 * isInstanceOf({}, Object)
 * isInstanceOf([], Object)
 * isInstanceOf([], Array)
 *
 * @example
 * // returns false
 * isInstanceOf({}, Array)
 * isInstanceOf([], Map)
 */
const isInstanceOf = (val, target) => val instanceof target;

/**
 * Utility class to resolve paths
 *
 * @private
 * @param {TreeNode} target
 * @param {Array<string>} path
 * @param {boolean} [createMissing=false]
 * @returns {object}
 */
const resolvePath = (target, path, createMissing = false) => {
    let targetNew;
    let key;
    let success = true;

    if (path.length === 1) {
        targetNew = target;
        key = path[0];
    } else {
        if (target.has(path[0]) && TreeNode.isTreeNode(target.get(path[0]))) {
            targetNew = target.get(path[0]);
        } else {
            if (createMissing) {
                targetNew = new TreeNode();
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
 * @extends Map
 */
const TreeNode = class extends Map {
    /**
     * Quercus main class constructor
     *
     * @constructor
     * @param {Array<Array<string>,any>} [pairArr=null] Optional array of path-value pairs to set
     */
    constructor(pairArr = []) {
        super();

        pairArr.forEach(pair => this.setPath(pair[0], pair[1]));
    }
    /**
     * Checks if a value is a TreeNode
     *
     * @static
     * @param {any} val
     * @returns {boolean}
     */
    static isTreeNode(val) {
        return isInstanceOf(val, TreeNode);
    }
    /**
     * Checks if a given path exists
     *
     * @param {Array<string>} path
     * @param {boolean} [treeNodesAreTruthy=false]
     * @returns {boolean}
     */
    hasPath(path, treeNodesAreTruthy = false) {
        if (path.length === 0) return treeNodesAreTruthy;

        const resolved = resolvePath(this, path);

        if (resolved.success && resolved.target.has(resolved.key)) {
            if (!treeNodesAreTruthy) {
                return !TreeNode.isTreeNode(resolved.target.get(resolved.key));
            }
            return true;
        }
        return false;
    }
    /**
     * Returns value of a given path
     *
     * @param {Array<string>} path
     * @returns {any}
     */
    getPath(path) {
        if (path.length === 0) return this;

        const resolved = resolvePath(this, path);

        return resolved.success && resolved.target.has(resolved.key) ? resolved.target.get(resolved.key) : null;
    }
    /**
     * Sets value of a given path
     *
     * @param {Array<string>} path
     * @param {any} val
     */
    setPath(path, val) {
        if (path.length === 0) return null;

        const resolved = resolvePath(this, path, true);

        resolved.target.set(resolved.key, val);

        return resolved.target;
    }
};

return TreeNode;

}());
