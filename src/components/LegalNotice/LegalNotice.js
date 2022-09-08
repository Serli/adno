import { Component } from "react";

// Import CSS
import "./LegalNotice.css"

export default class LegalNotice extends Component {
    render() {
        return (
            <div className="legal-notice">
                <p>
                    Mentions légales
                    L’édition du site https://adno.app/ est assurée par l’association Maison des sciences et des techniques / Espace Mendès France, dont le siège social est situé au 1 place de la Cathédrale, 86000 Poitiers.
                    Téléphone 05 49 50 33 08 - courriel : contact[@]emf.fr
                    Le Directeur de la publication est : Mario Cottron

                    L’hébergement du site https://adno.app/ est assuré par la société Github Inc, dont le siège social est situé 88 Colin P. Kelly Jr ST CA 94107 99404 San Francisco (États-Unis).
                </p>
            </div>
        )
    }
}