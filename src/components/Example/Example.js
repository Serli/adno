import React, { Component } from "react";
import { withRouter } from "react-router";

// Import Utils
import { generateExamplePainting, generateNautre } from "./../../../Utils/utils"

// Import CSS
import "./Example.css"

class Example extends Component {
    render() {
        return (

            <div className="adno-examples">
                <div className="example-card">
                    <img src="https://free.iiifhosting.com/iiif/1c8d49343676a04fffcd92979c02e9394e48bac96f590fffbadffc9133cd06b9/full/,250/0/native.jpg" />

                    <div className="example-card-body">
                        <h2>Siège de Poitiers par Coligny en 1569</h2>
                        <p>Peinture de François Nautré, Musées de la ville de Poitiers et de la Société des Antiquaires de l’Ouest</p>
                    </div>

                    <div className="example-card-btns">
                        <button className="generate-btn" onClick={() => generateNautre()}>Ajouter à mes projets</button>

                    </div>
                </div>

                <div className="example-card">
                    <img src="https://iiif.emf.fr/iiif/3/peutinger.jp2/full/,250/0/default.jpg" />

                    <div className="example-card-body">
                        <h2>Tabula Peutingeriana</h2>
                        <p>Copie du XIIIe siècle d’une ancienne carte romaine où figurent les routes et les villes principales de l’Empire romain, fac-similé de Konrad Miller de 1887.</p>
                    </div>

                    <div className="example-card-btns">
                        <button className="generate-btn" onClick={() => generateExamplePainting("Tabula Peutingeriana", "Copie du XIIIe siècle d’une ancienne carte romaine où figurent les routes et les villes principales de l’Empire romain, fac-similé de Konrad Miller de 1887.", "https://iiif.emf.fr/iiif/3/peutinger.jp2/info.json")}>Ajouter à mes projets</button>

                    </div>
                </div>


                <div className="example-card">
                    <img src="https://iiif.emf.fr/iiif/3/SuomiNPP_earth_full.jp2/full/,250/0/default.jpg" />

                    <div className="example-card-body">
                        <h2>Blue Marble 2012</h2>
                        <p>Blue Marble 2012 - La Terre vue de l'espace. NASA, NOAA, GSFC, Suomi NPP, VIIRS, Norman Kuring.</p>
                    </div>

                    <div className="example-card-btns">
                        <button className="generate-btn" onClick={() => generateExamplePainting("Blue Marble 2012", "Blue Marble 2012 - La Terre vue de l'espace. NASA, NOAA, GSFC, Suomi NPP, VIIRS, Norman Kuring.", "https://iiif.emf.fr/iiif/3/SuomiNPP_earth_full.jp2/info.json")}>Ajouter à mes projets</button>

                    </div>
                </div>

                <div className="example-card">
                    <img src="https://images.harvardx.harvard.edu/iiif/cellx/euk_cell.jpg/full/,250/0/default.jpg" />

                    <div className="example-card-body">
                        <h2>Cellules procaryotes et eucaryotes</h2>
                        <p>CellXplorer (eukaryotic and prokaryotic cells) Extrait d’un cours en ligne edX (Harvard) consacré à la biologie cellulaire.</p>
                    </div>

                    <div className="example-card-btns">
                        <button className="generate-btn" onClick={() => generateExamplePainting("Cellules procaryotes et eucaryotes", "CellXplorer (eukaryotic and prokaryotic cells) Extrait d’un cours en ligne edX (Harvard) consacré à la biologie cellulaire.", "https://images.harvardx.harvard.edu/iiif/cellx/euk_cell.jpg/info.json")}>Ajouter à mes projets</button>

                    </div>
                </div>

   <div className="example-card">
                    <img src="https://iiif.emf.fr/iiif/3/james-webb_1.png/full/,250/0/default.jpg" />

                    <div className="example-card-body">
                        <h2>James Webb</h2>
                        <p>Amas de galaxies SMACS 0723. Une des premières images envoyées par le télescope spatial James Webb. NASA, ESA, CSA, STScI.</p>
                    </div>

                    <div className="example-card-btns">
                        <button className="generate-btn" onClick={() => generateExamplePainting("James Webb", "Amas de galaxies SMACS 0723. Une des premières images envoyées par le télescope spatial James Webb. NASA, ESA, CSA, STScI.", "https://iiif.emf.fr/iiif/3/james-webb_1.png/info.json")}>Ajouter à mes projets</button>

                    </div>
                </div>
                
                 <div className="example-card">
                    <img src="https://gallica.bnf.fr/iiif/ark:/12148/btv1b6001280q/f19/full/,250/0/default.jpg" />

                    <div className="example-card-body">
                        <h2>Tite Live</h2>
                        <p>Tite-Live, Histoire romaine, version française par Pierre Bersuire Manuscrits de la Bibliothèque Sainte-Geneviève.</p>
                    </div>

                    <div className="example-card-btns">
                        <button className="generate-btn" onClick={() => generateExamplePainting("Tite Live", "Tite-Live, Histoire romaine, version française par Pierre Bersuire Manuscrits de la Bibliothèque Sainte-Geneviève.", "https://gallica.bnf.fr/iiif/ark:/12148/btv1b6001280q/f19/info.json")}>Ajouter à mes projets</button>

                    </div>
                </div>


            </div>

        )
    }
}
export default withRouter(Example)