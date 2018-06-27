import { Quercus } from "../quercus";
declare type quercusPath = any[];
declare type quercusPathEntry = [quercusPath, any];
declare type quercusPathEntryInitializer = quercusPathEntry[];
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
declare const resolvePath: (targetOld: Quercus, path: any[], createMissing?: boolean) => IResolvedPath;
export { resolvePath, quercusPath, quercusPathEntry, quercusPathEntryInitializer };
