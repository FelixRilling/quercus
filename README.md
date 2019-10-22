# Quercus

> Dynamic tree data structures in TypeScript

## Introduction

Quercus allows you to create dynamic tree data structures of any size and depth.
Even though the examples use strings as path items, any data type accepted as a Map key can be used.

**[Docs](https://felixrilling.github.io/quercus/)**

## Usage

```shell
npm install quercus
```

### Example

```typescript
import { NestedMapTree } from "quercus";

const tree = new NestedMapTree<string, number>();
tree.setPath(["foo", "bar"], 5);
tree.setPath(["foo", "bizz"], 12);
tree.setPath(["bar", "fazz"], 560);
```

Creates a tree like this:

```text
        tree
        /  \
      foo   bar
      / \     \
    bar bizz  fazz
     |   |      |
     5   12    560
```

Nodes can be checked and retrieved using `hasPath` and `getPath`.

```typescript
import { LookupStrategy, NestedMapTree } from "quercus";

const tree = new NestedMapTree<string, number>();
tree.setPath(["foo", "bar"], 5);
tree.setPath(["foo", "bizz"], 12);
tree.setPath(["bar", "fazz"], 560);

console.log(`foo->bar: ${tree.hasPath(["foo", "bar"])}`); // "foo->bar: true"
console.log(`bar: ${tree.hasPath(["bar"])}`); // "bar: true"
console.log(`lorem: ${tree.hasPath(["lorem"])}`); // "lorem: false"

console.log(
    `foo->bar: ${tree.hasPath(
        ["foo", "bar"],
        LookupStrategy.EXISTENCE_BY_VALUE
    )}`
); // "foo->bar: true"
console.log(`bar: ${tree.hasPath(["bar"], LookupStrategy.EXISTENCE_BY_VALUE)}`); // "bar: false"
console.log(
    `lorem: ${tree.hasPath(["lorem"], LookupStrategy.EXISTENCE_BY_VALUE)}`
); // "lorem: false"
```

```typescript
import { NestedMapTree } from "quercus";

const tree = new NestedMapTree<string, number>();
tree.setPath(["foo", "bar"], 5);
tree.setPath(["foo", "bizz"], 12);
tree.setPath(["bar", "fazz"], 560);

/*
 *    {
 *        node: { value: 5, map: new Map() },
 *        matchedPath: ["foo", "bar"],
 *        trailingPath: []
 *    };
 */
tree.getPath(["foo", "bar"]);

/*
 *    {
 *        node: null,
 *        matchedPath: ["foo"],
 *        trailingPath: ["lorem"]
 *    };
 */
tree.getPath(["foo", "lorem"]);
```
