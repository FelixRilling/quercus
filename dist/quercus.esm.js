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

const resolvePath = (target, path, createMissing = false) => {
    let targetNew;
    let rest;
    let success = true;

    if (path.length === 0) {
        targetNew = target;
        rest = [];
    } else if (path.length === 1) {
        targetNew = target;
        rest = path;
    } else {
        if (target.has(path[0])) {
            targetNew = target.get(path[0]);
        } else {
            if (createMissing) {
                targetNew = new TreeNode();
                target.set(path[0], targetNew);
            } else {
                success = false;
            }
        }

        rest = path.slice(1);
    }

    if (rest.length > 1) {
        return resolvePath(targetNew, rest, createMissing);
    } else {
        return { success, rest: rest[0], target: targetNew };
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
    hasPath(path = [], onlyValues = true) {
        const { target, rest, sucess } = resolvePath(this, path);

        if (sucess) {
            const val = target.get(rest);

            return onlyValues ? !TreeNode.isTreeNode(val) : true;
        } else {
            return false;
        }
    }
    getPath(path = []) {
        const { target, rest, sucess } = resolvePath(this, path);

        return sucess ? target.get(rest) : null;
    }
    setPath(path = [], val) {
        const { target, rest } = resolvePath(this, path, true);

        target.set(rest, val);

        return true;
    }
};

export default TreeNode;
