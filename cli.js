#!/usr/bin/env node

//
// This is the entry point for the HiFi tools

const term = require("./tools/terminal")
const parseCommandLine = require("command-line-args")

// First read command line args and pass to the specified tool
const mainOptions = parseCommandLine([ {name: "command", defaultOption: true} ], { stopAtFirstUnknown: true })
const argv = mainOptions._unknown || []

// Load tool
const tools = require("./tools/index.js")
const tool = tools[mainOptions.command]

// Load tool
if (tool) {

    // Run it
    tool.fromCommandLine(argv).catch(err => {

        // Log the error
        term.red("\nERROR: ")(err.message)("\n\n")

    })

} else {

    // Tool not found
    console.log("The tool '" + mainOptions.command + "' was not found.")
    console.log("")
    console.log("  Format: ")
    console.log("")
    console.log("    npx hifi-tools <tool> <options>")
    console.log("")
    console.log("  List of available tools: ")
    console.log("")
    for (var name in tools)
        console.log("    " + name + " : " + tools[name].shortDescription)

    console.log("")

}
