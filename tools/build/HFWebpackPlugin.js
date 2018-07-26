const es3ify = require("es3ify")

module.exports = class HFWebpackPlugin {

    constructor(opts) {
        this.opts = opts
    }

    /** @private Called on build */
    apply(compiler) {

        // Listen for compile start
        compiler.hooks.emit.tap("HFWebpackPlugin", compilation => {

            // Go through all files
            for (var chunk of compilation.chunks) {
                for (var filename of chunk.files) {
                    var file = compilation.assets[filename]

                    // Convert code to ES3
                    var text = es3ify.transform(file.source())

                    // Apply global variables
                    for (var keyval of this.opts.vars || []) {

                        // Get var name and value
                        var idx = keyval.indexOf(":")
                        var key = keyval
                        var val = "true"
                        if (idx != -1) {
                            key = keyval.substring(0, idx)
                            val = keyval.substring(idx+1)
                        }
                        text = "var " + key + " = \"" + val + "\"\n" + text
                    }

                    // "return" the final library
                    text += "\n\n(HFScript && HFScript['default'] || HFScript)"

                    // Done, replace asset
                    compilation.assets[filename] = {
                        source: function() {
                            return text
                        },
                        size: function() {
                            return text.length
                        }
                    }

                }
            }

        })

    }

}
