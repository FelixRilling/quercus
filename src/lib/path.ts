import { Quercus } from "../quercus";

type quercusPath = any[];
type quercusPathEntry = [quercusPath, any];
type quercusPathEntryInitializer = quercusPathEntry[];

interface IResolvedPath {
    readonly target: Quercus;
    readonly key: any;
    readonly success: boolean;
}
/**
 * Resolves path through Quercus instances.
 *
 * @private
 * @since 1.0.0
 * @param {Quercus} targetOld starting target for resolving.
 * @param {any[]} path path to resolve.
 * @param {boolean} [createMissing=false] if requested instances should be created if they don't exist.
 * @returns {object} resolved path object.
 * @example
 * const q = new Quercus([["foo", "bar"], 5]);
 *
 * resolvePath(q, ["foo", "bar"])
 * // => {target: Quercus{"bar": 5}, key: "bar", success: true}
 */
const resolvePath = (
    targetOld: Quercus,
    path: any[],
    createMissing: boolean = false
): IResolvedPath => {
    let target = targetOld;
    let key: any = path[0];
    let success = true;

    if (path.length > 1) {
        const sub = targetOld.get(key);

        /**
         * Does the key exist on the target?
         *     true  -> assign it
         *     false ->
         *         Is createMissing truthy?
         *             true  -> Create a new Quercus; assign it and set it on the parent
         *             false -> declare unsuccessful, abort
         */
        if (targetOld.has(key) && Quercus.isQuercus(sub)) {
            target = sub;
        } else {
            if (createMissing) {
                target = new Quercus();
                targetOld.set(key, target);
            } else {
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

export {
    resolvePath,
    quercusPath,
    quercusPathEntry,
    quercusPathEntryInitializer
};
