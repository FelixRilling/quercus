/**
 * Strategy to use when resolving tree nodes internally.
 *
 * @private
 */
enum ResolverStrategy {
    /**
     * Return immediately when a node cannot be found.
     * This is usually wanted when looking up an entry that might exist.
     */
    RETURN_ON_MISSING,

    /**
     * Create missing nodes dynamically and continue.
     * This is used when setting a new value that has non-existent middle nodes.
     */
    CREATE_MISSING
}

export { ResolverStrategy };
