//
// This file is included in the user's bundle. Here we can inject polyfills and other necessary stuff.

// Set timeout and set interval, move them to the global scope
var global = (function() { return this })()
global.setInterval = (func, ms) => Script.setInterval(func, ms)
global.setTimeout = (func, ms) => Script.setTimeout(func, ms)
global.clearInterval = (id) => Script.clearInterval(id)
global.clearTimeout = (id) => Script.clearTimeout(id)

// Some packages access the `window` global variable, make sure it exists
global.window = global

// Import polyfills from core-js. Some polyfills cause High Fidelity to crash, so don't import all of them.
require("core-js/fn/function")
require("core-js/fn/object")
require("core-js/fn/symbol")
require("core-js/fn/array")
require("core-js/fn/date")
require("core-js/fn/promise")

// Support for async/await
require("regenerator-runtime/runtime")
