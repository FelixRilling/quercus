import { Quercus } from "../Quercus";
import { ResolvedPath } from "./ResolvedPath";
/**
 * Resolves path through Quercus instances.
 *
 * @private
 * @since 1.0.0
 * @param {Quercus} targetOld Starting target for resolving.
 * @param {any[]} path Path to resolve.
 * @param {boolean} [createMissing=false] If requested instances should be created if they don't exist.
 * @returns {object} Resolved path object.
 * @example
 * const q = new Quercus([["foo", "bar"], 5]);
 *
 * resolvePath(q, ["foo", "bar"])
 * // => {target: Quercus{"bar": 5}, key: "bar", success: true}
 */
declare const resolvePath: (targetOld: Quercus, path: any[], createMissing?: boolean) => ResolvedPath;
export { resolvePath };
//# sourceMappingURL=resolvePath.d.ts.map