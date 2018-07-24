//
// This script changes the color of the Entity when a user clicks on it.

// Delay code via promises
function sleep(ms) {
    return new Promise(onSuccess => {
        setTimeout(onSuccess, ms)
    })
}

export default class PromiseTest {

    /** Called by High Fidelity when the script starts */
    preload(id) {

        // Store entity ID
        this.id = id

    }

    /** Called by HF when the user clicks on the entity with the mouse or the laser in VR mode */
    async mousePressOnEntity() {

        // Output some messages
        Window.displayAnnouncement("Hello 1")
        await sleep(500)
        Window.displayAnnouncement("Hello 2")
        await sleep(500)
        Window.displayAnnouncement("Hello 3")

    }

}
