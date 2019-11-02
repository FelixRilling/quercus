var Quercus = (function (exports, lodash) {
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
     * Helper method for parent result creation.
     *
     *
     * @private
     * @param previousNode Previous node.
     * @param key Key used.
     * @return Parent lookup result.
     */
    const createParentResult = (previousNode, key) => {
        if (lodash.isNil(previousNode)) {
            return null;
        }
        return {
            node: previousNode,
            key
        };
    };
    /**
     * Default implementation of a tree, using nested maps.
     *
     * @public
     * @class
     */
    class TreeNode {
        /**
         * Creates a new instance with an optional value.
         *
         * @param value Value to instantiate the node with. If none is provided, null is set.
         */
        constructor(value = null) {
            this.value = value;
            this.paths = new Map();
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
            const lookupResult = this.resolvePath(path, 0 /* RETURN_ON_MISSING */);
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
            return this.resolvePath(path, 0 /* RETURN_ON_MISSING */);
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
            const lookupResult = this.resolvePath(path, 1 /* CREATE_MISSING */);
            const node = lookupResult.node;
            node.value = value;
        }
        /**
         * Resolves the path against this tree.
         *
         * @private
         * @param path Path to resolve
         * @param resolverStrategy Strategy to use for non-existent nodes.
         * @param previousNode Only used for recursive calls. Node the resolving was delegated from.
         * @param previousPath Only used for recursive calls. Path the resolving was delegated from.
         * @return Lookup result.
         */
        resolvePath(path, resolverStrategy, previousNode = null, previousPath = []) {
            const key = path[0];
            let node;
            if (!this.paths.has(key)) {
                if (resolverStrategy !== 1 /* CREATE_MISSING */) {
                    return {
                        node: null,
                        parent: createParentResult(previousNode, key),
                        matchedPath: previousPath,
                        trailingPath: path
                    };
                }
                node = new TreeNode();
                this.paths.set(key, node);
            }
            else {
                node = this.paths.get(key);
            }
            const previousPathNew = Array.from(previousPath);
            previousPathNew.push(key);
            if (path.length === 1) {
                return {
                    node,
                    parent: createParentResult(previousNode, key),
                    matchedPath: previousPathNew,
                    trailingPath: []
                };
            }
            const nextPath = path.slice(1);
            return node.resolvePath(nextPath, resolverStrategy, this, previousPathNew);
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

    exports.TreeNode = TreeNode;

    return exports;

}({}, _));
//# sourceMappingURL=quercus.js.map
