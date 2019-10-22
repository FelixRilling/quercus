/**
 * Interface defining a single node containing a value and a map of sub-nodes.
 *
 * @public
 */
interface TreeNode<TKey, UValue> {
    value: UValue | null;
    readonly map: Map<TKey, TreeNode<TKey, UValue>>;
}

export { TreeNode };
