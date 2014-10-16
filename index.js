"use strict";

/**
 * @param  {Object} object
 * @param  {string|array} position - Key or an array containing keys.
 * @param  {boolean} insert - Create the child object if it doesn't exist.
 * @param  {boolean} throwConflicts - Throw an error if there are conflicts.
 * @return {Object|undefined} - The child object or undefined if none was found.
 */
module.exports = function(obj, pos, insert, throwConflicts) {
  if (!(obj instanceof Object))
    throw new TypeError("Expecting an instance of Object");

  if (typeof pos === "string")
    pos = [pos];
  else if (!(pos instanceof Array))
    throw new TypeError("Expecting a string or array as position argument");

  var ref = obj;

  for (var i = 0; i < pos.length; i++) {
    if (ref[pos[i]] === undefined) {
      if (insert) {
        ref[pos[i]] = {};
      } else {
        return undefined;
      }
    } else if (!(ref[pos[i]] instanceof Object)) {
      // There's a conflict
      if (throwConflicts) {
        var e=  new Error('Conflict detected at key '+pos[i]+' on position '+i);
        e.index = i;
        e.key = pos[i];
        throw e;
      } else if (insert) {
        ref[pos[i]] = {};
      } else {
        return undefined;
      }
    }

    ref = ref[pos[i]];
  }

  return ref;

};
