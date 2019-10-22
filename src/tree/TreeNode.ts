interface TreeNode<TKey, UValue> {
    value: UValue | null;
    map: Map<TKey, TreeNode<TKey, UValue>>;
}

export { TreeNode };
