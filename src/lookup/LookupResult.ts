import { TreeNode } from "../tree/TreeNode";
import { PathArr } from "src/path/PathArr";
import { LookupResultParent } from "./LookupResultParent";

/**
 * Result of resolving a path in a tree.
 *
 * @public
 */
interface LookupResult<TKey, UValue> {
    readonly node: TreeNode<TKey, UValue> | null;
    readonly parent: LookupResultParent<TKey, UValue> | null;
    readonly matchedPath: PathArr<TKey>;
    readonly trailingPath: PathArr<TKey>;
}

export { LookupResult };
