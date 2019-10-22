import { TreeNode } from "../tree/TreeNode";
import { Path } from "../path/Path";

interface LookupResult<TKey, UValue> {
    readonly node: TreeNode<TKey, UValue> | null;
    readonly matchedPath: Path<TKey>;
    readonly trailingPath: Path<TKey>;
}

export { LookupResult };
