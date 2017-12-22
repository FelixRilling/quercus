# Quercus

> Simple and dynamic tree data structures in JavaScript

Quercus allows you to create tree data structures of any size and depth.
This library is written in TypeScript.

## Usage

Check the docs here: TODO

### Example

```js
const Quercus = require("quercus");

const tree = new Quercus();

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

You could also create the paths in the constructor:

```js
const Quercus = require("quercus");

const tree = new Quercus([
    [["foo", "bar"], 5],
    [["foo", "bizz"], 12],
    [["bar", "fazz"], 560]
]);
```
