const Quercus = require("./dist/quercus.common");

/*[
[["foo", "bar"], 5],
[["foo", "bizz"], 12],
[["bar", "fazz"], 560]
*/
const q = new Quercus();

q.set(["foo", "bar"], 5);
q.set(["foo", "bizz"], 12);
q.set(["bar", "fazz"], 560);

console.log(q);
