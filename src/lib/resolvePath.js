import TreeLayer from "./treeLayer";

const resolvePath = (
    treeLayer,
    path = [],
    createMissingLayers = false,
    depth = 1
) => {
    if (path.length === 0) {
        return null;
    }
    const currentKey = path[0];
    let result = {
        depth,
        target: null
    };

    if (treeLayer.has(currentKey)) {
        result.target = treeLayer.get(currentKey);
    } else {
        if (createMissingLayers) {
            result.target = new TreeLayer();
            treeLayer.set(currentKey, result.target);
        } else {
            return null;
        }
    }

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
