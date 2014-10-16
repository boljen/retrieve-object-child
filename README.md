# retrieve-object-child (NodeJS)

[![Build Status](https://travis-ci.org/boljen/retrieve-object-child.svg)](https://travis-ci.org/boljen/retrieve-object-child)

Retrieve child objects from an object.

## Installation

First get the package from NPM

    npm install retrieve-object-child

And now simply require it in your application

    var retrieveChild = require('retrieve-object-child');

## Api

    /**
     * @param  {Object} object
     * @param  {string|array} position - Key or an array containing keys.
     * @param  {boolean} insert - Create the child object if it doesn't exist.
     * @param  {boolean} throwConflicts - Throw an error if there are conflicts.
     * @return {Object|undefined} - The child object or undefined if none was found.
     */
    function retrieveChild(object, position, insert, throwConflicts)

## Usage

First up is the most basic format of usage of this function with all the default
parameters:

    object.customNested = {};
    object.customNested.deeper = {};

    var child = retrieveChild(object, ['customNested', 'deeper']);
    child === object.customNested.deeper

It will return undefined when the child does not exist

    var child = retrieveChild(object, 'non_existent');
    child === undefined

or when there's a conflict

    object.customNested = "not an object";

    var child = retrieveChild(object, ['customNested', 'deeper']);
    child === undefined

### insert enabled
Retrieving existing objects works the same way, but when trying to access an
unexisting object path, it will build one recursively.

    object = {};
    var child = retrieveChild(object, ['customNested', 'deeper'], true);
    child === object.customNested.deeper

or will override all children when there's a conflict.

    object.customNested = "not an object";

    var child = retrieveChild(object, ['customNested', 'deeper'], true);
    child === object.customNested.deeper

### throwConflict enabled

An error will be thrown whenever there's a conflict instead of falling back on
the default behavior.

    object.customNested = "some primitive type like a string";

    try {
      retrieveChild(object, ['customNested', 'deeper'], false, true);
    } catch (e) {
      e.message === 'Conflict detected at key customNested on position 0'
      e.key === 'customNested'
      e.index === 0
    }

As you can see, you can find out exactly where a conflict has been detected.

## Test

    grunt test

## License

MIT.
