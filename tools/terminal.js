//
// This extends TerminalKit to be a bit easier to work with.

module.exports = require("terminal-kit").terminal

/** Promise based input field */
module.exports.asyncInputField = (options) => {

    // Create promise
    return new Promise((onSuccess, onFail) => {

        // Show input field
        module.exports.inputField(options, (error, input) => {

            // Done, stop grabbing input
            module.exports.grabInput(false)

            // Resolve or fail the promise
            if (error)
                onFail(error)
            else
                onSuccess(input)
                
        })

    })

}
