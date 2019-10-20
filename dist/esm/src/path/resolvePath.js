/**
 * Resolves path through Quercus instances.
 *
 * @private
 * @since 1.0.0
 * @param {Tree} targetOld Starting target for resolving.
 * @param {any[]} path Path to resolve.
 * @param {boolean} [createMissing=false] If requested instances should be created if they don't exist.
 * @returns {object} Resolved path object.
 * @example
 * const q = new Tree([["foo", "bar"], 5]);
 *
 * resolvePath(q, ["foo", "bar"])
 * // => {target: Tree{"bar": 5}, key: "bar", success: true}
 */
const resolvePath = (targetOld, path, createMissing = false) => {
    let target = targetOld;
    let key = path[0];
    let success = true;
    if (path.length > 1) {
        const sub = targetOld.get(key);
        /*
         * Does the key exist on the target?
         *     true  -> Assign it
         *     false ->
         *         Is createMissing truthy?
         *             true  -> Create a new Quercus, assign it and set it on the parent.
         *             false -> Declare unsuccessful, abort.
         */
        if (targetOld.has(key) && targetOld.isTree(sub)) {
            target = sub;
        }
        else {
            if (createMissing) {
                target = targetOld.createSubTree();
                targetOld.set(key, target);
            }
            else {
                success = false;
            }
        }
        // Assign the next key
        key = path[1];
    }
    if (path.length > 2 && success) {
        return resolvePath(target, path.slice(1), createMissing);
    }
    return { target, key, success };
};
export { resolvePath };
//# sourceMappingURL=resolvePath.js.map