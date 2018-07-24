//
// This script changes the color of the Entity when a user clicks on it.

import random from 'math-random'

export default class ExternalLibTest {

    /** Called by High Fidelity when the script starts */
    preload(id) {

        // Store entity ID
        this.id = id

    }

    /** Called by HF when the user clicks on the entity with the mouse or the laser in VR mode */
    async mousePressOnEntity() {

        // Do an HTTP request
        Window.displayAnnouncement(`Generating random number: ${random()}`)

    }

}
