import TreeLayer from "./lib/treeLayer";
import resolvePath from "./lib/resolvePath";
import { objDefineProperty } from "lightdash";

/**
 * Quercus main class
 *
 * @class
 */
const Quercus = class {
    /**
     * Quercus main class constructor
     *
     * @constructor
     * @param {any} [data=null]
     */
    constructor(data) {
        this.tree = new TreeLayer(data);

        objDefineProperty(this, "depth", 0, false);
    }
    /**
     * Check if a given path exists
     *
     * @param {Array<string>} [path=[]]
     * @param {boolean} [allowEmpty=true] If a layer without data and children should be counted as existing
     * @returns {boolean}
     */
    has(path = [], allowEmpty = true) {
        const { target } = resolvePath(this.tree, path);

        if (target !== null) {
            return allowEmpty
                ? true
                : target.data !== null || target.size !== 0;
        } else {
            return false;
        }
    }
    /**
     * Return value of a path
     *
     * @param {Array<string>} [path=[]]
     * @param {boolean} [returnData=true] If only the data of a layer rather than the layer itself should be returned
     * @returns {any|TreeLayer}
     */
    get(path = [], returnData = true) {
        const { target } = resolvePath(this.tree, path);

        return returnData ? target.data : target;
    }
    /**
     * Sets data of a path
     *
     * @param {Array<string>} [path=[]]
     * @param {any} [data=null]
     * @returns {boolean}
     */
    set(path = [], data) {
        const { target, depth } = resolvePath(this.tree, path, true);

        target.data = data;
        this.depth = depth;

        return true;
    }
};

export default Quercus;
