import { isInstanceOf } from "lightdash";

/**
 * Utility class to resolve paths
 *
 * @param {TreeNode} target
 * @param {Array<string>} path
 * @param {boolean} [createMissing=false]
 * @returns {object}
 */
const resolvePath = (target, path, createMissing = false) => {
    let targetNew;
    let pathNew;
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

        pathNew = path.slice(1);
        rest = pathNew[0];
    }

    if (path.length > 2 && success) {
        return resolvePath(targetNew, pathNew, createMissing);
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
     * @param {Array<Array<string>,any>} [pairArr=null]
     */
    constructor(pairArr = []) {
        super();

        pairArr.forEach(pair => {
            this.setPath(pair[0], pair[1]);
        });
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
     * @param {boolean} [onlyValues=true] If only value-ends should be considered truthy. When false, TreeNodes are thruthy too
     * @returns {boolean}
     */
    hasPath(path, onlyValues = true) {
        const { target, rest, success } = resolvePath(this, path);

        if (success && target.has(rest)) {
            return onlyValues ? !TreeNode.isTreeNode(target.get(rest)) : true;
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
        const { target, rest, success } = resolvePath(this, path);

        return success && target.has(rest) ? target.get(rest) : null;
    }
    /**
     * Sets value of a given path
     *
     * @param {Array<string>} path
     * @param {any} val
     */
    setPath(path, val) {
        const { target, rest } = resolvePath(this, path, true);

        target.set(rest, val);
    }
};

export default TreeNode;
