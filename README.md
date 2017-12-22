# Quercus

> Simple and fast tree data structures in JS

## Usage

### API

```js
const Quercus = require("quercus");

// new Quercus([val<any>])
const tree = new Quercus();

// quercus.setPath(string[],<any>)
tree.setPath(["foo", "bar"], 5); // true

// quercus.getPath(string[])
tree.getPath(["foo", "bar"]); // 5
tree.getPath(["foo", "bar"], false); // TreeLayer{data: 5}

// quercus.hasPath(string[],[onlyValues<boolean>=true])
tree.hasPath(["foo", "bar"]); // true
tree.hasPath(["foo"]); // false
tree.hasPath(["foo", "bar"], false); // true
tree.hasPath(["foo"], false); // true
```

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
