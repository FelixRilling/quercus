import { PathArr } from "./path/PathArr";

interface Tree<TKey, UValue>
    extends Map<TKey, UValue | Tree<TKey, UValue> | null> {
    hasPath(path: PathArr<TKey>, nodesAreTruthy: boolean): boolean;

    getPath(path: PathArr<TKey>): UValue | Tree<TKey, UValue> | null;

    setPath(path: PathArr<TKey>, val: any): Tree<TKey, UValue> | null;

    isTree(val: any): val is Tree<TKey, UValue>;

    createSubTree(): Tree<TKey, UValue>;
}

export { Tree };
