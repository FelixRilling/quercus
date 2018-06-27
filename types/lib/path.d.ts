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
 * Utility function to resolve paths.
 *
 * @private
 * @since 1.0.0
 * @param {Quercus} targetOld
 * @param {any[]} path
 * @param {boolean} [createMissing=false]
 * @returns {object}
 * @example
 * const q = new Quercus([["foo", "bar"], 5]);
 *
 * resolvePath(q, ["foo", "bar"])
 * // => {target: Quercus{"bar": 5}, key: "bar", success: true}
 */
declare const resolvePath: (targetOld: Quercus, path: any[], createMissing?: boolean) => IResolvedPath;
export { resolvePath, quercusPath, quercusPathEntry, quercusPathEntryInitializer };
