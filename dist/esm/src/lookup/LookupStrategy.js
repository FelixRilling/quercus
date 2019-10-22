/**
 * Strategy to use when checking for a paths existence in a tree.
 * The strategy is used to check the final node only.
 *
 * @public
 */
var LookupStrategy;
(function (LookupStrategy) {
    /**
     * Every node is considered to exist, regardless its value.
     */
    LookupStrategy[LookupStrategy["EXISTENCE_BY_NODE"] = 0] = "EXISTENCE_BY_NODE";
    /**
     * Only nodes which have a non-nil value are considered existent.
     */
    LookupStrategy[LookupStrategy["EXISTENCE_BY_VALUE"] = 1] = "EXISTENCE_BY_VALUE";
})(LookupStrategy || (LookupStrategy = {}));
export { LookupStrategy };
//# sourceMappingURL=LookupStrategy.js.map