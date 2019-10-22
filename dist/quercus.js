var quercus = (function (exports, lodash) {
    'use strict';

    /**
     * Strategy to use when checking for a paths existence in a tree.
     * The strategy is used to check the final node only.
     *
     * @public
     */

    (function (LookupStrategy) {
        /**
         * Every node is considered to exist, regardless its value.
         */
        LookupStrategy[LookupStrategy["EXISTENCE_BY_NODE"] = 0] = "EXISTENCE_BY_NODE";
        /**
         * Only nodes which have a non-nil value are considered existent.
         */
        LookupStrategy[LookupStrategy["EXISTENCE_BY_VALUE"] = 1] = "EXISTENCE_BY_VALUE";
    })(exports.LookupStrategy || (exports.LookupStrategy = {}));

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

    /**
     * Default implementation of a tree, using nested maps.
     *
     * @public
     * @class
     */
    class NestedMapTree {
        /**
         * Creates an empty instance.
         */
        constructor() {
            this.node = this.createNode();
        }
        /**
         * Sets a value for a given path.
         * Middle nodes will be created automatically.
         *
         * @public
         * @param path Path to set the value for. May not be empty.
         * @param value Value to set.
         */
        setPath(path, value) {
            this.validatePath(path);
            const lookupResult = this.resolve(path, ResolverStrategy.CREATE_MISSING);
            const node = lookupResult.node;
            node.value = value;
        }
        /**
         * Checks if a given path exists in this tree.
         *
         * @public
         * @param path Path to check for. May not be empty.
         * @param lookupStrategy Strategy to use. See {@link LookupStrategy} for details.
         * @return if the path exists, based on the strategy used.
         */
        hasPath(path, lookupStrategy = exports.LookupStrategy.EXISTENCE_BY_NODE) {
            this.validatePath(path);
            const lookupResult = this.resolve(path, ResolverStrategy.RETURN_ON_MISSING);
            if (lodash.isNil(lookupResult.node)) {
                return false;
            }
            if (lookupStrategy === exports.LookupStrategy.EXISTENCE_BY_NODE) {
                return true;
            }
            return !lodash.isNil(lookupResult.node.value);
        }
        /**
         * Gets a given path in this tree.
         *
         * @public
         * @param path Path to get. May not be empty.
         * @return lookup result, containing details about which node was retrieved and what path was used.
         */
        getPath(path) {
            this.validatePath(path);
            return this.resolve(path, ResolverStrategy.RETURN_ON_MISSING);
        }
        /**
         * Resolves a path.
         *
         * @private
         * @param path Path to get.
         * @param resolverStrategy Strategy to use during resolving.
         * @return lookup result, containing details about which node was retrieved and what path was used.
         */
        resolve(path, resolverStrategy) {
            let node = this.node;
            for (let i = 0; i < path.length; i++) {
                const key = path[i];
                if (!node.map.has(key)) {
                    if (resolverStrategy !== ResolverStrategy.CREATE_MISSING) {
                        return {
                            node: null,
                            matchedPath: path.slice(0, i),
                            trailingPath: path.slice(i)
                        };
                    }
                    const newNode = this.createNode();
                    node.map.set(key, newNode);
                    node = newNode;
                }
                else {
                    node = node.map.get(key);
                }
            }
            return {
                node,
                matchedPath: path,
                trailingPath: []
            };
        }
        /**
         * Creates a new (sub-)node
         *
         * @private
         * @return new node.
         */
        createNode() {
            return { value: null, map: new Map() };
        }
        /**
         * Validates a given path.
         *
         * @param path Path to check.
         * @private
         */
        validatePath(path) {
            if (lodash.isEmpty(path)) {
                throw new TypeError("Path may not be empty.");
            }
        }
    }

    exports.NestedMapTree = NestedMapTree;

    return exports;

}({}, _));
//# sourceMappingURL=quercus.js.map
