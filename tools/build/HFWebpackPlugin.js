const es3ify = require("es3ify")

module.exports = class HFWebpackPlugin {

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
