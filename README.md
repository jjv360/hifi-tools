![](https://img.shields.io/badge/status-ready-brightgreen.svg)

# High Fidelity Tools

This is a collection of tools for High Fidelity to make the process of creating scripts easier.

## Build

```
npx hifi-tools build ./myscript.js
```

The Build tool converts and packages your code so that it can be used in High Fidelity. This lets you use ES6+ features
which are not yet available natively in High Fidelity.

List of optional arguments:

```
 --output <path>      Sets the path to the output bundle
 --var NAME:value     (multiple) Sets a global variable
```
