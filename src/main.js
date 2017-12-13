import TreeLayer from "./lib/treeLayer";
import resolvePath from "./lib/resolvePath";
import { objDefineProperty } from "lightdash";

const Quercus = class {
    constructor(data) {
        this.tree = new TreeLayer(data);

        objDefineProperty(this, "depth", 0, false);
    }
    has(path) {
        return resolvePath(this.tree, path) !== null;
    }
    get(path, returnData = true) {
        const { target } = resolvePath(this.tree, path);

        return returnData ? target.data : target;
    }
    set(path, data = null) {
        const { target, depth } = resolvePath(this.tree, path, true);

        if (target !== null) {
            target.data = data;
            this.depth = depth;

            return true;
        } else {
            return false;
        }
    }
};

export default Quercus;
