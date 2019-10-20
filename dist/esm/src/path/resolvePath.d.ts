import { ResolvedPath } from "./ResolvedPath";
import { Tree } from "../Tree";
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
declare const resolvePath: <TKey, TValue>(targetOld: Tree<TKey, TValue>, path: TKey[], createMissing?: boolean) => ResolvedPath<TKey, TValue>;
export { resolvePath };
//# sourceMappingURL=resolvePath.d.ts.map