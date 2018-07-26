//
// This tool helps users set up a new project

const parseCommandLine = require("command-line-args")
const term = require("../terminal")
const webpack = require("webpack")
const path = require("path")
const HFWebpackPlugin = require("./HFWebpackPlugin")

// Turn webpack into a promise
function webpackAsync(config) {
  return new Promise((onSuccess, onFail) => {
    webpack(config, (err, stats) => {
      if (err || stats.hasErrors()) {
        console.log(stats.toString())
        onFail(err || new Error("There was an issue webpacking your content."))
      } else {
        onSuccess(stats)
      }
    })
  })
}

module.exports = class Build {

    static get shortDescription() { return "Compile your code into a High Fidelity-ready bundle" }

    static async fromCommandLine(argv) {

        // Decode command line args
        const opts = parseCommandLine([
            { name: "entry", type: String, defaultOption: true },
            { name: "output", type: String }
        ], { argv })

        // Ensure all args are available
        const entry = opts.entry || ""
        const output = opts.output || (entry.substring(0, entry.lastIndexOf(".")) + ".hfscript.js")
        if (!entry) {

            // Show help
            console.log("This tool compiles your script into a High Fidelity-ready bundle.")
            console.log("Usage:")
            console.log("")
            console.log("    npx hifi-tools build ./myscript.js")
            console.log("      - or -")
            console.log("    npx hifi-tools build ./myscript.js --output ./bundle.js")
            console.log("")
            return

        }

        // Determine which path to babel-loader to use. When installed as part of someone's package, we can use the
        // plain 'babel-loader'. But when run with npx, we need to use the absolute path.
        var babelLoaderPath = path.resolve(__dirname, "../../", "node_modules", "babel-loader")
        try {
            require(babelLoaderPath)
        } catch (e) {
            babelLoaderPath = "babel-loader"
        }

        // Start
        console.log("Building...")
        var stats = await webpackAsync({
            mode: "production",
            entry: [
                path.resolve(__dirname, "polyfills.js"),
                entry
            ],
            output: {
                path: path.dirname(path.resolve(process.cwd(), output)),
                filename: path.basename(path.resolve(process.cwd(), output)),
                libraryTarget:"var",
                library:"HFScript"
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        loader: babelLoaderPath,
                        options: {
                            presets: [require("babel-preset-env")]
                        }
                    }
                ]
            },
            plugins: [
                new HFWebpackPlugin()
            ]
        })

        // Done!
        console.log("Done!")

    }

}
