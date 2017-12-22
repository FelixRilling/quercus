interface IResolvedPath {
    target: QuercusNode;
    key: any;
    success: boolean;
}

/**
 * Utility class to resolve paths
 *
 * @private
 * @since 1.0.0
 * @param {QuercusNode} target
 * @param {any[]} path
 * @param {boolean} [createMissing=false]
 * @returns {object}
 */
const resolvePath = (
    target: QuercusNode,
    path: any[],
    createMissing: boolean = false
): IResolvedPath => {
    /**
     * Is assigned to input as default and only changed when the next sub-QuercusNode is found
     */
    let targetNew: QuercusNode = target;
    let key: any;
    let success: boolean = true;

    if (path.length === 1) {
        key = path[0];
    } else {
        if (
            target.has(path[0]) &&
            QuercusNode.isQuercusNode(target.get(path[0]))
        ) {
            targetNew = target.get(path[0]);
        } else {
            if (createMissing) {
                targetNew = new QuercusNode();
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
 * @since 1.0.0
 * @extends Map
 */
class QuercusNode extends Map<any, QuercusNode | any> {
    /**
     * Checks if a value is a Quercus instance
     *
     * @static
     * @since 1.0.0
     * @param {any} val
     * @returns {boolean}
     * @example
     * const q = new Quercus([["foo", bar], 5]);
     *
     * Quercus.isQuercusNode(q) // true
     * Quercus.isQuercusNode(q.getPath(["foo"])) // true
     * Quercus.isQuercusNode("foo") // false
     */
    public static isQuercusNode(val: any): boolean {
        return val instanceof QuercusNode;
    }
    /**
     * QuercusNode main class constructor
     *
     * @constructor
     * @since 1.0.0
     * @param { Array<Array<any>, any>} [pairArr=[]] Optional array of path-value pairs to set
     * @example
     * const q = new Quercus(); // Empty tree
     * const q2 = new Quercus([["foo", bar], 5]); // Tree initalized with a path-value pair
     */
    public constructor(pairArr: Array<[any[], any]> = []) {
        super();

        pairArr.forEach((pair: [any[], any]) => this.setPath(pair[0], pair[1]));
    }
    /**
     * Checks if a given path exists
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
     * q.hasPath(["foo", "bar"]); // true
     * q.hasPath(["foo"]); // false
     * q.hasPath(["foo"], false); // true
     */
    public hasPath(
        path: any[],
        quercusNodesAreTruthy: boolean = false
    ): boolean {
        if (path.length === 0) {
            return quercusNodesAreTruthy;
        }

        const resolved = resolvePath(this, path);

        if (resolved.success && resolved.target.has(resolved.key)) {
            if (!quercusNodesAreTruthy) {
                return !QuercusNode.isQuercusNode(
                    resolved.target.get(resolved.key)
                );
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
     * q.getPath(["foo", "bar"]); // 5
     * q.getPath(["bar"]); // TreeNode{"fazz"=>560}
     * q.getPath(["lorem"]); // null
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
     * Sets value of a given path.
     * If the given path is empty, null is returned.
     * If the value was set successfully, the value's QuercusNode is returned
     *
     * @since 1.0.0
     * @param {any[]} path
     * @param {any} val
     * @returns {QuercusNode|null}
     * @example
     * const q = new Quercus();
     *
     * q.setPath(["foo", "bar"], 5); // TreeNode{"bar"=>5}
     * q.setPath(["bar", "fazz"], 560); // TreeNode{"fazz"=>560}
     * q.setPath([], "foo"); // null
     */
    public setPath(path: any[], val: any): QuercusNode | null {
        if (path.length === 0) {
            return null;
        }

        const resolved = resolvePath(this, path, true);

        resolved.target.set(resolved.key, val);

        return resolved.target;
    }
}

export default QuercusNode;
