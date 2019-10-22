import { isEmpty, isNil } from "lodash";
import { LookupStrategy } from "../lookup/LookupStrategy";
import { ResolverStrategy } from "./ResolverStrategy";
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
    hasPath(path, lookupStrategy = LookupStrategy.EXISTENCE_BY_NODE) {
        this.validatePath(path);
        const lookupResult = this.resolve(path, ResolverStrategy.RETURN_ON_MISSING);
        if (isNil(lookupResult.node)) {
            return false;
        }
        if (lookupStrategy === LookupStrategy.EXISTENCE_BY_NODE) {
            return true;
        }
        return !isNil(lookupResult.node.value);
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
        if (isEmpty(path)) {
            throw new TypeError("Path may not be empty.");
        }
    }
}
export { NestedMapTree };
//# sourceMappingURL=NestedMapTree.js.map