/**
 * Strategy to use when checking for a paths existence in a tree.
 * The strategy is used to check the final node only.
 *
 * @public
 */
declare enum LookupStrategy {
    /**
     * Every node is considered to exist, regardless its value.
     */
    EXISTENCE_BY_NODE = 0,
    /**
     * Only nodes which have a non-nil value are considered existent.
     */
    EXISTENCE_BY_VALUE = 1
}
export { LookupStrategy };
//# sourceMappingURL=LookupStrategy.d.ts.map