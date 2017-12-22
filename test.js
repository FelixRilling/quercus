const Quercus = require("./dist/quercus.common");

/*[
[["foo", "bar"], 5],
[["foo", "bizz"], 12],
[["bar", "fazz"], 560]
*/
const q = new Quercus([
    [["foo", "bar"], 5],
    [["foo", "bizz"], 12],
    [["bar", "fazz"], 560]
]);

console.log(q);
