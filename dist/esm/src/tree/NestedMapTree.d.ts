import { Tree } from "./Tree";
import { Path } from "../path/Path";
import { LookupResult } from "../lookup/LookupResult";
import { LookupStrategy } from "../lookup/LookupStrategy";
declare class NestedMapTree<TKey, UValue> implements Tree<TKey, UValue> {
    private readonly node;
    constructor();
    setPath(path: Path<TKey>, value: UValue): void;
    hasPath(path: Path<TKey>, lookupStrategy?: LookupStrategy): boolean;
    getPath(path: Path<TKey>): LookupResult<TKey, UValue>;
    private resolve;
    private createNode;
    private validatePath;
}
export { NestedMapTree };
//# sourceMappingURL=NestedMapTree.d.ts.map