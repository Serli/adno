import { Component } from "react";

class About extends Component {
    render() {
        return (
            <div class="container adno-about">
                <p>
                    <p><strong>Adno est une application web de visualisation, d’édition et de partage pair-à-pair de narrations et de parcours sur des images IIIF.</strong></p>
                    <p>Porté par l&rsquo;<a href="https://emf.fr">Espace Mendès France</a> - Poitiers, en partenariat avec l&rsquo;<a href="https://www.abbaye-saint-savin.fr/">Abbaye de Saint-Savin-sur-Gartempe et la vallée des fresques</a>, la <a href="https://www.bsg.univ-paris3.fr/iguana/www.main.cls">Bibliothèque Sainte-Geneviève</a>, Paris, la <a href="http://www.citebd.org/">Cité internationale de la bande dessinée et de l&rsquo;image</a>, Angoulême, les <a href="https://www.poitiers.fr/c__231_977__accueil_musee_sainte_croix.html">Musées de Poitiers</a>, le <a href="https://museum.larochelle.fr/">Muséum d’histoire naturelle de La Rochelle</a>, Adno  a été retenu parmi les seize lauréats de l’édition 2022 de l’appel à projets <a href="https://www.culture.gouv.fr/Presse/Communiques-de-presse/Resultats-de-l-appel-a-projets-Services-numeriques-innovants-2022">Services numériques innovants</a> porté par le ministère de la Culture.</p>
                    <p><img src="images/bloc-logos.png" alt="Logos"/></p>
                        <h2 id="origine-de-adno">Origine de Adno</h2>
                        <p>Un acteur culturel qui souhaite mettre en ligne ses collections d&rsquo;images est confronté à des choix complexes. Les solutions sont trop souvent onéreuses, peu évolutives et surtout incompatibles les unes avec les autres alors qu&rsquo;elles tentent pourtant de répondre à des besoins communs.</p>
                        <p>L’initiative <a href="https://iiif.io">IIIF (International Image Interoperability Framework)</a> est née de la constatation que la diffusion des images sur le web était « trop lente, trop coûteuse, trop disjointe et trop complexe ». Elle a été lancée en 2015 par la British Library, la Bibliothèque Nationale de France, Die Bayerische Staatsbibliothek, Nasjonalbiblioteket, Artstor, Wellcome Trust et les universités Cornell, Oxford, Princeton, Stanford et Yale. Le Consortium réunit aujourd’hui une soixantaine de bibliothèques de recherche, de bibliothèques nationales, d&rsquo;archives, de sociétés et d&rsquo;agrégateurs du monde entier. De nombreux professionnels et amateurs contribuent aussi au dynamisme de la communauté.</p>
                        <p>IIIF est devenu le cadre technique commun et standardisé de diffusion des images de haute qualité et de leurs métadonnées. Les images deviennent véritablement accessibles, consultables, comparables, manipulables, citables, annotables et mixables par n&rsquo;importe quelle application compatible capable de se « brancher » sur les entrepôts des uns et des autres. Des centaines de millions de ressources — reproductions de documents et d&rsquo;œuvres, photos, dessins, bandes dessinées, cartes, plans, graphiques,  etc. — sont ainsi exposées.  Le protocole s’est étendu récemment à l’audio, à la vidéo et à la 3D.</p>
                        <p>Si les serveurs et les visualiseurs IIIF sont répandus et matures, les outils « grand public » restent expérimentaux et souvent fermés. Quelques logiciels et services de « storytelling » dédiés à l&rsquo;éditorialisation et à la médiation de ressources IIIF sont particulièrement intéressants :</p>
                        <ul>
                            <li><a href="https://storiiies.cogapp.com/">Storiiies</a> - un service bien conçu et en accès libre mais propriétaire.</li>
                            <li><a href="https://cartinal.leventhalmap.org/documentation/panel-truck.html">Panel Truck</a> - un logiciel libre qui requiert l&rsquo;édition de code.</li>
                            <li><a href="https://www.exhibit.so/">Exhibit</a> - un service initié pendant la crise Covid-19 pour assurer la continuité pédagogique d’une université.</li>
                            <li><a href="https://medialab.sciencespo.fr/outils/tesselle/">Tesselle</a> - un outil libre développé au Media Lab de SciencesPo,  avec une très bonne ergonomie mais ne supporte par IIIF.</li>
                        </ul>
                        <p>En associant étroitement visualisation et édition, Adno tente de dépasser les limites de l’existant et apporte une solution accessible et conviviale aux chercheurs, aux artistes, aux enseignants, aux médiateurs culturels et scientifiques. Elle vise à développer de nouveaux usages créatifs et pédagogiques.</p>
                        <h2 id="description">Description</h2>
                        <p>Adno permet d’explorer une œuvre ou un document dans son ensemble ou par ses détails, de présenter des connaissances, de raconter des histoires, de dessiner ou de taguer, etc. et en pratique, de lire et d’écrire des annotations et de les partager simplement.</p>
                        <p>Adno est une application web, simple et ergonomique, qui permet la visualisation, l’édition et la diffusion d’images IIIF annotées. Elle prend en entrée une image IIIF (seule ou provenant d’un manifeste) ou une liste d’annotations (au sens W3C ou IIIF). Elle produit une liste ordonnée d’annotations. Une annotation associe des informations textuelles ou multimédias à une zone.  Concrètement, Adno présente les caractéristiques suivantes :</p>
                        <ul>
                            <li>
                                <p><strong>côté serveur :</strong> l&rsquo;installation est simplifiée (fichiers statiques), le service ne distribue et n&rsquo;enregistre aucun contenu et ne collecte pas de données personnelles,</p>
                            </li>
                            <li>
                                <p><strong>côté client :</strong> traitement, stockage et diffusion sont opérés par le navigateur, l&rsquo;application est utilisable sur une tablette, un ordinateur ou une table tactile.</p>
                            </li>
                        </ul>
                        <p>L&rsquo;InterPlanetary File System (IPFS) est le protocole utilisé par Adno pour partager les annotations. C’est un système pair à pair de distribution de contenus adressables par hypermédia. Il permet de stocker des fichiers ou des arborescences de manière décentralisée et pérenne, et d’y accéder via un identifiant IPFS ou une URL http classique.</p>
                        <p>Adno repose sur des standards ouverts et des composants libres. Il est développé de manière agile en respectant les bonnes pratiques (code, tests, documentation, accessibilité, etc.).  C’est un service en ligne (adno.app), un logiciel autonome et un composant naturellement intégrable aux technologies du Web3 : web sémantique, intelligence artificielle, blockchain, etc.</p>
                        <p>Par conception, le recours aux protocoles IPFS et IIIF contribue à limiter la consommation énergétique. Les  listes d&rsquo;annotations sont textuelles et donc très légères, les images y sont seulement référencées. Enfin, seules les parties d&rsquo;images nécessaires sont téléchargées.</p>
                        <p>Adno facilite la diffusion et la visibilité des contenus culturels et contribue à l’amélioration des moyens techniques permettant l’interopérabilité et la réutilisation, en adéquation avec la feuille de route « données et contenus culturels » du ministère de la culture.</p>
                        <h2 id="caractère-innovant">Caractère innovant</h2>
                        <p>IIIF offre un accès simplifié et uniforme à des fonctions avancées d’interactions avec les documents : exploration fluide et enrichie des images (zoom profond, rotation, etc.), visualisation multi-couches et multispectrales, comparaison et annotation de zones, etc.</p>
                        <p>Adno est un outil commun au service des humanités numériques, de l’éducation, de la recherche et de la création. Il rend abordable et populaire deux technologies innovantes et prometteuses : IIIF et IPFS. Ces approches fondamentalement décentralisées et collaboratives concrétisent le potentiel du web sémantique et préfigurent le web distribué.</p>
                        <p>Adno ouvre des nombreuses perspectives : prise en charge des audios, des vidéos et des objets 3D, édition collaborative, production participative (crowdsourcing), développement de modules pours logiciels spécialisés de bibliothèques numériques ou de publication, connexion avec des dispositifs de reconnaissances de formes (IA), etc.</p>
                        <h2 id="caractère-diffusableet-réplicable">Caractère diffusable et réplicable</h2>
                        <p>Adno est librement utilisable sur <a href="https://adno.app/exemple/">adno.app</a> Les sources comme la documentation sont publiées sous licences libres. Elles sont téléchargeables depuis les forges logicielles ouvertes. Adno peut donc être installée et adaptée sans aucune restriction.</p>
                        <h2 id="versions">Versions</h2>
                        <ul>
                            <li>première version attendue début octobre 2022</li>
                        </ul>
                        <h2 id="contact">Contact</h2>
                        <p>N&rsquo;hésitez pas à nous contacter via le <a href="https://adno.app/contact/">formulaire en ligne</a>.</p>
                    </p>
            </div>
        )
    }
}

export default About;