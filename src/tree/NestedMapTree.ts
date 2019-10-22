import { Tree } from "./Tree";
import { Path } from "../path/Path";
import { isEmpty, isNil } from "lodash";
import { TreeNode } from "./TreeNode";
import { LookupResult } from "../lookup/LookupResult";
import { LookupStrategy } from "../lookup/LookupStrategy";
import { ResolverStrategy } from "./ResolverStrategy";

/**
 * Default implementation of a tree, using nested maps.
 *
 * @public
 * @class
 */
class NestedMapTree<TKey, UValue> implements Tree<TKey, UValue> {
    private readonly node: TreeNode<TKey, UValue>;

    /**
     * Creates an empty instance.
     */
    public constructor() {
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
    public setPath(path: Path<TKey>, value: UValue): void {
        this.validatePath(path);

        const lookupResult = this.resolve(
            path,
            ResolverStrategy.CREATE_MISSING
        );
        const node: TreeNode<TKey, UValue> = lookupResult.node!;

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
    public hasPath(
        path: Path<TKey>,
        lookupStrategy: LookupStrategy = LookupStrategy.EXISTENCE_BY_NODE
    ): boolean {
        this.validatePath(path);

        const lookupResult = this.resolve(
            path,
            ResolverStrategy.RETURN_ON_MISSING
        );
        if (isNil(lookupResult.node)) {
            return false;
        }

        if (lookupStrategy === LookupStrategy.EXISTENCE_BY_NODE) {
            return true;
        }
        return !isNil(lookupResult.node.value);
    }

    /**
     * Gets a given path in this tree.
     *
     * @public
     * @param path Path to get. May not be empty.
     * @return lookup result, containing details about which node was retrieved and what path was used.
     */
    public getPath(path: Path<TKey>): LookupResult<TKey, UValue> {
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
    private resolve(
        path: Path<TKey>,
        resolverStrategy: ResolverStrategy
    ): LookupResult<TKey, UValue> {
        let node: TreeNode<TKey, UValue> = this.node;
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
            } else {
                node = node.map.get(key)!;
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
    private createNode(): TreeNode<TKey, UValue> {
        return { value: null, map: new Map() };
    }

    /**
     * Validates a given path.
     *
     * @param path Path to check.
     * @private
     */
    private validatePath(path: Path<TKey>): void {
        if (isEmpty(path)) {
            throw new TypeError("Path may not be empty.");
        }
    }
}

export { NestedMapTree };
