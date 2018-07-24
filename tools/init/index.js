//
// This tool helps users set up a new project

const parseCommandLine = require("command-line-args")
const term = require("../terminal")

module.exports = class Init {

    static get shortDescription() { return "Set up a new project" }

    static fromCommandLine(argv) {

        // Run
        new Init().run()

    }

    async run() {

        // Check if package.json already exists

        // Header
        term("This will help setup the project for your High Fidelity script.\n\n")

        // Ask user for name of project
        term("Project name: ")
        var projname = await term.asyncInputField({ default: "hifi-script" })

        // Done

    }

}
