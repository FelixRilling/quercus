import { isInstanceOf } from "lightdash";

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
    static isTreeNode(val) {
        return isInstanceOf(val, TreeNode);
    }
    hasPath(path, onlyValues = true) {
        const { target, rest, success } = resolvePath(this, path);

        if (success && target.has(rest)) {
            return onlyValues ? !TreeNode.isTreeNode(target.get(rest)) : true;
        } else {
            return false;
        }
    }
    getPath(path) {
        const { target, rest, success } = resolvePath(this, path);

        return success && target.has(rest) ? target.get(rest) : null;
    }
    setPath(path, val) {
        const { target, rest } = resolvePath(this, path, true);

        target.set(rest, val);

        return true;
    }
};

export default TreeNode;
