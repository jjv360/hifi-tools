
const parseCommandLine = require("command-line-args")

module.exports = class About {

    static get shortDescription() { return "Get more details about a tool eg. 'hifi-tools about join'" }

    static async fromCommandLine(argv) {

        // Decode command line args
        const opts = parseCommandLine([
            { name: "tool", type: String, defaultOption: true }
        ], { argv })

        // Check if no plugin selected
        if (!opts.tool) {
            console.log("")
            console.log("   hifi-tools is a collection of tools for building High Fidelity scripts.")
            console.log("   Run `hifi-tools list` to see all tools, and `hifi-tools help <tool>` to")
            console.log("   see more details about a tool.")
            console.log("")
            return
        }

        // Find tool
        const tools = require("../tools")
        const tool = tools[opts.tool]
        if (!tool) {
            console.warn("Tool '" + opts.tool + "' not found. Run `hifi-tools list` to see available tools.")
            return
        }

        // Print out description
        console.log("")
        console.log("  - Name: " + opts.tool)
        console.log(tool.longDescription || "(no description found)")

    }

}
