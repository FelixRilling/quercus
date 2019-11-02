import { TreeNode } from "../tree/TreeNode";
/**
 * Parent data of a lookup result.
 *
 * @private
 */
interface LookupResultParent<TKey, UValue> {
    readonly node: TreeNode<TKey, UValue>;
    readonly key: TKey;
}
export { LookupResultParent };
//# sourceMappingURL=LookupResultParent.d.ts.map