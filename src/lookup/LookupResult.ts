import { TreeNode } from "../tree/TreeNode";
import { PathArr } from "src/path/PathArr";

/**
 * Result of resolving a path in a tree.
 *
 * @public
 */
interface LookupResult<TKey, UValue> {
    readonly node: TreeNode<TKey, UValue> | null;
    readonly parent: {
        readonly node: TreeNode<TKey, UValue>;
        readonly key: TKey;
    };
    readonly matchedPath: PathArr<TKey>;
    readonly trailingPath: PathArr<TKey>;
}

export { LookupResult };
