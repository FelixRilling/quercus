import { isInstanceOf } from "lightdash/dist/lightdash.esm";

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
    let rest;
    let success = true;

    if (path.length === 1) {
        targetNew = target;
        rest = path[0];
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

        rest = path[1];
    }

    if (path.length > 2 && success) {
        return resolvePath(targetNew, path.slice(1), createMissing);
    } else {
        return { success, rest, target: targetNew };
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

        if (resolved.success && resolved.target.has(resolved.rest)) {
            if (!treeNodesAreTruthy) {
                return !TreeNode.isTreeNode(resolved.target.get(resolved.rest));
            } else {
                return true;
            }
        } else {
            return false;
        }
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

        return resolved.success && resolved.target.has(resolved.rest)
            ? resolved.target.get(resolved.rest)
            : null;
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

        resolved.target.set(resolved.rest, val);

        return resolved.target;
    }
};

export default TreeNode;
