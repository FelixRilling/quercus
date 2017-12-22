/* import isInstanceOf from "lightdash/src/is/instanceOf"; */

type pathArr = string[];

interface ITreeNode extends Map<string, any> {}
interface IResolvedPath {
    target: ITreeNode;
    key: string;
    success: boolean;
}

/**
 * Utility class to resolve paths
 *
 * @private
 * @param {TreeNode} target
 * @param {Array<string>} path
 * @param {boolean} [createMissing=false]
 * @returns {object}
 */
const resolvePath = (
    target: ITreeNode,
    path: pathArr,
    createMissing: boolean = false
): IResolvedPath => {
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
const TreeNode = class extends Map<string, any> {
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
     * @param {Array<Array<string>,any>} [pairArr=null] Optional array of path-value pairs to set
     */
    public constructor(pairArr: Array<[pathArr, any]> = []) {
        super();

        pairArr.forEach((pair: [pathArr, any]) =>
            this.setPath(pair[0], pair[1])
        );
    }
    /**
     * Checks if a given path exists
     *
     * @param {Array<string>} path
     * @param {boolean} [treeNodesAreTruthy=false]
     * @returns {boolean}
     */
    public hasPath(
        path: pathArr,
        treeNodesAreTruthy: boolean = false
    ): boolean {
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
     * @param {Array<string>} path
     * @returns {any}
     */
    public getPath(path: pathArr): any | null {
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
     * @param {Array<string>} path
     * @param {any} val
     */
    public setPath(path: pathArr, val: any): any | null {
        if (path.length === 0) {
            return null;
        }

        const resolved = resolvePath(this, path, true);

        resolved.target.set(resolved.key, val);

        return resolved.target;
    }
};

export default TreeNode;
