
const parseCommandLine = require("command-line-args")
const glob = require("glob")
const fs = require("fs")

module.exports = class Join {

    static get shortDescription() { return "Join JS files into one" }
    static get longDescription() { return `

    Joins all the JS files in the specified path into one. It also allows
    for specifying the "main" class used by the High Fidelity entity script.

    hifi-tools join /path/to/my/code/*.js --entry=MyClass
    hifi-tools join /path/to/my/code/*.js --entry=MyClass --construct
    hifi-tools join /path/to/my/code/*.js --entry=MyClass --output=/path/to/joined.js

    `}

    static async fromCommandLine(argv) {

        // Decode command line args
        const opts = parseCommandLine([
            { name: "input", type: String, defaultOption: true },
            { name: "entry", type: String },
            { name: "construct", type: Boolean },
            { name: "output", type: String }
        ], { argv })

        // Check if no input
        if (!opts.input) {
            console.log("")
            console.log("   Please specify the path to your code. eg. /path/*.js")
            console.log("")
            return
        }

        // Get a list of all files
        let files = glob.sync(opts.input)
        if (files.length == 0) {
            console.warn("No files found matching the specified path.")
            return
        }

        // Combine all
        let all = ""
        for (let file of files) {

            // Read entire file
            let fileContent = fs.readFileSync(file, "utf8")
            all += `













/***********${"*".repeat(file.length)}***********
 *          ${file}          *
 ***********${"*".repeat(file.length)}***********/

${fileContent}

`

        }

        // If we have the entry class name, output it at the end
        if (opts.entry && opts.construct)
            all += ";new " + opts.entry + "()"
        else if (opts.entry)
            all += ";(" + opts.entry + ")"

        // Done, get output file name
        let outFile = opts.output
        if (!outFile && opts.entry)
            outFile = opts.entry + ".joined.js"

        if (!outFile)
            outFile = "joined.js"

        // Write file
        fs.writeFileSync(outFile, all)

        // Done
        console.log("Joined file written to " + outFile)

    }

}
