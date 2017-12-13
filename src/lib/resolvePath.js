import TreeLayer from "./treeLayer";

/**
 * Resolves a path of keys in a tree
 *
 * @param {TreeLayer} treeLayer
 * @param {Array<string>} path
 * @param {boolean} [createMissingLayers=false]
 * @param {number} [depth=1]
 * @returns {object}
 */
const resolvePath = (
    treeLayer,
    path,
    createMissingLayers = false,
    depth = 1
) => {
    const currentKey = path[0];
    let result = {
        depth,
        target: treeLayer
    };

    if (path.length === 0) {
        return result;
    }

    if (treeLayer.has(currentKey)) {
        result.target = treeLayer.get(currentKey);
    } else {
        if (createMissingLayers) {
            result.target = new TreeLayer();
            treeLayer.set(currentKey, result.target);
        } else {
            result.target = null;

            return result;
        }
    }

    /**
     * If the end of the path is not reached, continue searching inside result
     */
    if (path.length > 1) {
        result = resolvePath(
            result.target,
            path.slice(1),
            createMissingLayers,
            depth + 1
        );
    }

    return result;
};

export default resolvePath;
