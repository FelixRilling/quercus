import { Tree } from "./Tree";
import { Path } from "../path/Path";
import { LookupResult } from "../lookup/LookupResult";
import { LookupStrategy } from "../lookup/LookupStrategy";
/**
 * Default implementation of a tree, using nested maps.
 *
 * @public
 * @class
 */
declare class NestedMapTree<TKey, UValue> implements Tree<TKey, UValue> {
    private readonly node;
    /**
     * Creates an empty instance.
     */
    constructor();
    /**
     * Sets a value for a given path.
     * Middle nodes will be created automatically.
     *
     * @public
     * @param path Path to set the value for. May not be empty.
     * @param value Value to set.
     */
    setPath(path: Path<TKey>, value: UValue): void;
    /**
     * Checks if a given path exists in this tree.
     *
     * @public
     * @param path Path to check for. May not be empty.
     * @param lookupStrategy Strategy to use. See {@link LookupStrategy} for details.
     * @return if the path exists, based on the strategy used.
     */
    hasPath(path: Path<TKey>, lookupStrategy?: LookupStrategy): boolean;
    /**
     * Gets a given path in this tree.
     *
     * @public
     * @param path Path to get. May not be empty.
     * @return lookup result, containing details about which node was retrieved and what path was used.
     */
    getPath(path: Path<TKey>): LookupResult<TKey, UValue>;
    /**
     * Resolves a path.
     *
     * @private
     * @param path Path to get.
     * @param resolverStrategy Strategy to use during resolving.
     * @return lookup result, containing details about which node was retrieved and what path was used.
     */
    private resolve;
    /**
     * Creates a new (sub-)node
     *
     * @private
     * @return new node.
     */
    private createNode;
    /**
     * Validates a given path.
     *
     * @param path Path to check.
     * @private
     */
    private validatePath;
}
export { NestedMapTree };
//# sourceMappingURL=NestedMapTree.d.ts.map