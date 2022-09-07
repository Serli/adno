import { buildAudioPlayer, buildYoutubeEmbed, buildImage } from "./utils";

class AdnoLocation extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create spans
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');


        let elem_a = document.createElement("a")
        elem_a.href="http://www.google.com/maps/place/49.46800006494457,17.11514008755796"
        elem_a.target = "_blank"
        elem_a.textContent = "(" + this.getAttribute('locx') + " , " + this.getAttribute('locy') + ")"

        shadow.appendChild(wrapper);
        wrapper.appendChild(elem_a);

    }
}
customElements.define('adno-loc', AdnoLocation);




class AdnoEmbedded extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create spans
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');

        shadow.appendChild(wrapper);
        wrapper.appendChild(buildYoutubeEmbed(this.getAttribute('url')));

    }
}

customElements.define('adno-ytb', AdnoEmbedded);


class AdnoAudioPlayer extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create spans
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');

        shadow.appendChild(wrapper);
        wrapper.appendChild(buildAudioPlayer(this.getAttribute('url')));

    }
}

customElements.define('adno-player', AdnoAudioPlayer);


class AdnoImage extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create spans
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');

        shadow.appendChild(wrapper);
        wrapper.appendChild(buildImage(this.getAttribute('url')));

    }
}

customElements.define('adno-img', AdnoImage);
