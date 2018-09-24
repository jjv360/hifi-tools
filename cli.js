#!/usr/bin/env node

//
// This is the entry point for the HiFi tools

const term = require("./tools/terminal")
const parseCommandLine = require("command-line-args")

// First read command line args and pass to the specified tool
const mainOptions = parseCommandLine([ {name: "command", defaultOption: true} ], { stopAtFirstUnknown: true })
const argv = mainOptions._unknown || []

// Special case: If no tool was specified, use the about tool
if (!mainOptions.command)
    mainOptions.command = "about"

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
    if (mainOptions.command != "list") console.log("The tool '" + mainOptions.command + "' was not found.")
    console.log("")
    console.log("  Format: ")
    console.log("")
    console.log("    npx hifi-tools <tool> <options>")
    console.log("")
    console.log("  List of available tools: ")
    console.log("")
    for (var name of Object.keys(tools).sort())
        console.log("    " + name + " : " + tools[name].shortDescription)

    console.log("")

}
