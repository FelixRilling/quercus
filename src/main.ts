/* import isInstanceOf from "lightdash/src/is/instanceOf"; */
interface IResolvedPath {
    target: TreeNode;
    key: any;
    success: boolean;
}

/**
 * Utility class to resolve paths
 *
 * @private
 * @param {TreeNode} target
 * @param {any[]} path
 * @param {boolean} [createMissing=false]
 * @returns {object}
 */
const resolvePath = (
    target: TreeNode,
    path: any[],
    createMissing: boolean = false
): IResolvedPath => {
    /**
     * Is assigned to input as default and only changed when the next sub-TreeNode is found
     */
    let targetNew: TreeNode = target;
    let key: any;
    let success: boolean = true;

    if (path.length === 1) {
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
class TreeNode extends Map<any, any> {
    /**
     * Checks if a value is a TreeNode
     *
     * @static
     * @param {any} val
     * @returns {boolean}
     */
    public static isTreeNode(val: any): boolean {
        return val instanceof TreeNode;
    }
    /**
     * Quercus main class constructor
     *
     * @constructor
     * @param { Array<Array<any>, any>} [pairArr=[]] Optional array of path-value pairs to set
     */
    public constructor(pairArr: Array<[any[], any]> = []) {
        super();

        pairArr.forEach((pair: [any[], any]) => this.setPath(pair[0], pair[1]));
    }
    /**
     * Checks if a given path exists
     *
     * @param {any[]} path
     * @param {boolean} [treeNodesAreTruthy=false]
     * @returns {boolean}
     */
    public hasPath(path: any[], treeNodesAreTruthy: boolean = false): boolean {
        if (path.length === 0) {
            return treeNodesAreTruthy;
        }

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
     * @param {any[]} path
     * @returns {any}
     */
    public getPath(path: any[]): any | null {
        if (path.length === 0) {
            return this;
        }

        const resolved = resolvePath(this, path);

        return resolved.success && resolved.target.has(resolved.key)
            ? resolved.target.get(resolved.key)
            : null;
    }
    /**
     * Sets value of a given path
     *
     * @param {any[]} path
     * @param {any} val
     */
    public setPath(path: any[], val: any): TreeNode | null {
        if (path.length === 0) {
            return null;
        }

        const resolved = resolvePath(this, path, true);

        resolved.target.set(resolved.key, val);

        return resolved.target;
    }
}

export default TreeNode;
