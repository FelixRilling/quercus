var quercus = (function (exports, lodash) {
    'use strict';

    (function (LookupStrategy) {
        LookupStrategy[LookupStrategy["EXISTENCE_BY_NODE"] = 0] = "EXISTENCE_BY_NODE";
        LookupStrategy[LookupStrategy["EXISTENCE_BY_VALUE"] = 1] = "EXISTENCE_BY_VALUE";
    })(exports.LookupStrategy || (exports.LookupStrategy = {}));

    var ResolverStrategy;
    (function (ResolverStrategy) {
        ResolverStrategy[ResolverStrategy["RETURN_ON_MISSING"] = 0] = "RETURN_ON_MISSING";
        ResolverStrategy[ResolverStrategy["CREATE_MISSING"] = 1] = "CREATE_MISSING";
    })(ResolverStrategy || (ResolverStrategy = {}));

    class NestedMapTree {
        constructor() {
            this.node = this.createNode();
        }
        setPath(path, value) {
            this.validatePath(path);
            const lookupResult = this.resolve(path, ResolverStrategy.CREATE_MISSING);
            const node = lookupResult.node;
            node.value = value;
        }
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
        getPath(path) {
            this.validatePath(path);
            return this.resolve(path, ResolverStrategy.RETURN_ON_MISSING);
        }
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
        createNode() {
            return { value: null, map: new Map() };
        }
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
