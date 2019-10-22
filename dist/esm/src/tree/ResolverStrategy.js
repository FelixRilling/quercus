/**
 * Strategy to use when resolving tree nodes internally.
 *
 * @private
 */
var ResolverStrategy;
(function (ResolverStrategy) {
    /**
     * Return immediately when a node cannot be found.
     * This is usually wanted when looking up an entry that might exist.
     */
    ResolverStrategy[ResolverStrategy["RETURN_ON_MISSING"] = 0] = "RETURN_ON_MISSING";
    /**
     * Create missing nodes dynamically and continue.
     * This is used when setting a new value that has non-existent middle nodes.
     */
    ResolverStrategy[ResolverStrategy["CREATE_MISSING"] = 1] = "CREATE_MISSING";
})(ResolverStrategy || (ResolverStrategy = {}));
export { ResolverStrategy };
//# sourceMappingURL=ResolverStrategy.js.map