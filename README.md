# Quercus

> Simple and fast tree data structures in JS

## Usage

### API

```js
const Quercus = require("quercus");

// new Quercus([val<any>])
const tree = new Quercus();

// quercus.set(string[],<any>)
tree.set(["foo", "bar"], 5); // true

// quercus.set(string[],[returnData<boolean>=true])
tree.get(["foo", "bar"]); // 5
tree.get(["foo", "bar"], false); // TreeLayer{data: 5}

// quercus.has(string[],[allowEmpty<boolean>=true])
tree.has(["foo", "bar"]); // true
tree.has(["foo"]); // true
tree.has(["foo", "bar"], false); // true
tree.has(["foo"], false); // false
```

### Example

```js
const Quercus = require("quercus");

const tree = new Quercus();

tree.set(["foo", "bar"], 5);
tree.set(["foo", "bizz"], 12);
tree.set(["bar", "fazz"], 560);
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
