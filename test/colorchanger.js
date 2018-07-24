//
// This script changes the color of the Entity when a user clicks on it.

export default class ColorChanger {

    /** Called by High Fidelity when the script starts */
    preload(id) {

        // Store entity ID
        this.id = id

    }

    /** Called by HF when the user clicks on the entity with the mouse or the laser in VR mode */
    mousePressOnEntity() {

        // Randomize entity color
        Entities.editEntity(this.id, {
            color: {
                red: Math.floor(Math.random() * 255),
                green: Math.floor(Math.random() * 255),
                blue: Math.floor(Math.random() * 255)
            }
        })

    }

}
