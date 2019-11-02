import { isEmpty, isNil } from "lodash";
import { LookupStrategy } from "../lookup/LookupStrategy";
import { LookupResult } from "../lookup/LookupResult";
import { PathArr } from "../path/PathArr";

/**
 * Strategy to use when resolving tree nodes internally.
 *
 * @private
 */
const enum ResolverStrategy {
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

/**
 * Default implementation of a tree, using nested maps.
 *
 * @public
 * @class
 */
class TreeNode<TKey, UValue> {
    private readonly paths: Map<TKey, TreeNode<TKey, UValue>>;
    public value: UValue | null;

    /**
     * Creates a new instance with an optional value.
     *
     * @param value Value to instantiate the node with. If none is provided, null is set.
     */
    public constructor(value: UValue | null = null) {
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
    public hasPath(
        path: PathArr<TKey>,
        lookupStrategy: LookupStrategy = LookupStrategy.EXISTENCE_BY_NODE
    ): boolean {
        this.validatePath(path);

        const lookupResult = this.resolvePath(
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
    public getPath(path: PathArr<TKey>): LookupResult<TKey, UValue> {
        this.validatePath(path);

        return this.resolvePath(path, ResolverStrategy.RETURN_ON_MISSING);
    }

    /**
     * Sets a value for a given path.
     * Middle nodes will be created automatically.
     *
     * @public
     * @param path Path to set the value for. May not be empty.
     * @param value Value to set.
     */
    public setPath(path: PathArr<TKey>, value: UValue): void {
        this.validatePath(path);

        const lookupResult = this.resolvePath(
            path,
            ResolverStrategy.CREATE_MISSING
        );
        const node: TreeNode<TKey, UValue> = lookupResult.node!;

        node.value = value;
    }

    /**
     * Resolves the path against this tree.
     *
     * @private
     * @param path Path to resolve
     * @param resolverStrategy Strategy to use for non-existent nodes.
     * @param previousPath Only used for recursive calls. Path the resolving was delegated from.
     * @return Lookup result.
     */
    private resolvePath(
        path: PathArr<TKey>,
        resolverStrategy: ResolverStrategy,
        previousPath: PathArr<TKey> = []
    ): LookupResult<TKey, UValue> {
        const key = path[0];
        let node: TreeNode<TKey, UValue>;
        if (!this.paths.has(key)) {
            if (resolverStrategy !== ResolverStrategy.CREATE_MISSING) {
                return {
                    node: null,
                    parent: {
                        node: this,
                        key
                    },
                    matchedPath: previousPath,
                    trailingPath: path
                };
            }

            node = new TreeNode<TKey, UValue>();
            this.paths.set(key, node);
        } else {
            node = this.paths.get(key)!;
        }

        const previousPathNew = Array.from(previousPath);
        previousPathNew.push(key);

        if (path.length === 1) {
            return {
                node,
                parent: {
                    node: this,
                    key
                },
                matchedPath: previousPathNew,
                trailingPath: []
            };
        }

        const nextPath = path.slice(1);
        return node.resolvePath(nextPath, resolverStrategy, previousPathNew);
    }

    /**
     * Validates a given path.
     *
     * @param path Path to check.
     * @private
     */
    private validatePath(path: PathArr<TKey>): void {
        if (isEmpty(path)) {
            throw new TypeError("Path may not be empty.");
        }
    }
}

export { TreeNode };
