import { Path } from "../path/Path";
import { LookupStrategy } from "../lookup/LookupStrategy";
import { LookupResult } from "../lookup/LookupResult";

/**
 * Base tree interface defining map-like access.
 *
 * @public
 */
interface Tree<TKey, UValue> {
    setPath(path: Path<TKey>, value: UValue): void;

    hasPath(path: Path<TKey>, lookupStrategy: LookupStrategy): boolean;

    getPath(path: Path<TKey>): LookupResult<TKey, UValue>;
}

export { Tree };
