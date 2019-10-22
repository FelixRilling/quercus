import { TreeNode } from "../tree/TreeNode";
import { Path } from "../path/Path";
/**
 * Result of resolving a path in a tree.
 *
 * @public
 */
interface LookupResult<TKey, UValue> {
    readonly node: TreeNode<TKey, UValue> | null;
    readonly matchedPath: Path<TKey>;
    readonly trailingPath: Path<TKey>;
}
export { LookupResult };
//# sourceMappingURL=LookupResult.d.ts.map