module.exports = function(object, ...keys) {
  let r = {};
  for (let k of keys) {
    r[k] = object[k];
  }
  return r;
}