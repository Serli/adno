# Projet Adno

Adno est une application web de visualisation, d’édition et de partage pair-à-pair de narrations et de parcours sur des images fixes de haute qualité. Potentiellement, elle pourra s’étendre à l’audio, à la vidéo et à la 3D.

Proto : https://adno.app/

## Quelques liens

* Standards utiles
  * IIIF
    * https://iiif.io/
    * https://doc.biblissima.fr/introduction-iiif
    * https://projet.biblissima.fr/fr/introduction-protocoles-iiif-formation-enssib-2019
  * JPEG 2000
    * https://fr.wikipedia.org/wiki/JPEG_2000
* Ressources IIIF
  * https://gallica.bnf.fr/accueil/fr/content/accueil-fr
  * https://sketchfab.com/3d-models/la-grand-goule-e86fe915265c432c8ad0d49e25d2e0f3
* Inspirations
  * https://static.emf.fr/annona/nautre/
  * https://planchesdesciences.fr/
  * Tesselle
    * https://medialab.sciencespo.fr/outils/tesselle/
    * https://medialab.github.io/tesselle/#/
  * https://www.exhibit.so/
* Librairies
  * https://ncsu-libraries.github.io/annona/
  * https://openseadragon.github.io/


## Démarrer le projet

* Lancer l'application react : yarn start

## Génération des fichiers statiques (dossier dist)
* yarn build 

## Stockage des projets 
Les projets sont stockés dans le localStorage.
Ils sont séparés en deux :
* une partie pour les métadonnées du projet en lui-même 
* une deuxième partie pour les annotations 

## Quelques manifests pour démarrer :
* https://ronallo.com/iiif-workshop/presentation/example-manifests.html
* https://free.iiifhosting.com/iiif/1c8d49343676a04fffcd92979c02e9394e48bac96f590fffbadffc9133cd06b9/info.json
* https://iiif.emf.fr/iiif/3/SuomiNPP_earth_full.jp2/info.json