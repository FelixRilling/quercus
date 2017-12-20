const Quercus = require("./dist/quercus.common");

/*[
[["foo", "bar"], 5],
[["foo", "bizz"], 12],
[["bar", "fazz"], 560]
*/
const q = new Quercus();

/* q.setPath(["foo", "bar"], 5);
q.setPath(["foo", "bizz"], 12);
q.setPath(["bar", "fazz"], 560); */

q.setPath(["foo"], 1);
q.setPath(["a", "b", "c"], 5);

console.log(q);
