import { LookupStrategy } from "../lookup/LookupStrategy";
import { LookupResult } from "../lookup/LookupResult";
import { PathArr } from "../path/PathArr";
/**
 * Default implementation of a tree, using nested maps.
 *
 * @public
 * @class
 */
declare class TreeNode<TKey, UValue> {
    private readonly paths;
    value: UValue | null;
    /**
     * Creates a new instance with an optional value.
     *
     * @param value Value to instantiate the node with. If none is provided, null is set.
     */
    constructor(value?: UValue | null);
    /**
     * Checks if a given path exists in this tree.
     *
     * @public
     * @param path Path to check for. May not be empty.
     * @param lookupStrategy Strategy to use. See {@link LookupStrategy} for details.
     * @return if the path exists, based on the strategy used.
     */
    hasPath(path: PathArr<TKey>, lookupStrategy?: LookupStrategy): boolean;
    /**
     * Gets a given path in this tree.
     *
     * @public
     * @param path Path to get. May not be empty.
     * @return lookup result, containing details about which node was retrieved and what path was used.
     */
    getPath(path: PathArr<TKey>): LookupResult<TKey, UValue>;
    /**
     * Sets a value for a given path.
     * Middle nodes will be created automatically.
     *
     * @public
     * @param path Path to set the value for. May not be empty.
     * @param value Value to set.
     */
    setPath(path: PathArr<TKey>, value: UValue): void;
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
    private resolvePath;
    /**
     * Validates a given path.
     *
     * @param path Path to check.
     * @private
     */
    private validatePath;
}
export { TreeNode };
//# sourceMappingURL=TreeNode.d.ts.map