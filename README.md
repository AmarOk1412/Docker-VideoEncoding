# Docker-VideoEncoding

# Description du projet

Ce projet, réalisé lors du module proejt d'ESIR 2 a pour but de réaliser un scheduling temporel de containers docker fonctionnant sur un cluster de RaspberryPi dans le but de réaliser l'encodage de vidéos.

# Architecture du projet

Ce répertoire contient :

- **Docker_Files** : Les différents docker utilisé pour faire tourner le projet. C'est-à-dire les docker pour _glusterfs_ (utilisé pour avoir un espace commun), _swarm_ (utilisé pour le scheduling temporel des containers), _FileUploader_ qui est l'interface utilisateur, _split/encode/merge_ (utilisés pour encoder une vidéo).
- **FileUploader** : Le code source destiné au fonctionnement de l'interface (où on upload et lance l'encodage d'une vidéo)
- **Script** : Les scripts pour encoder une vidéo.
- **swarm** : Notre version de _DockerSwarm_ pour gérer le scheduling temporel.
- **the-graph** : L'[interface](https://github.com/the-grid/the-graph) utilisé pour voir l'état des dockers.

# Monter son instance

## Préparation d'un RaspberryPi

## FileUploader

## L'encodage d'une vidéo

## DockerSwarm

## The-Graph

# Fonctionnalités

## Fonctionnalités existantes

## TODOList

# Licence

--------------------------------------------------------------------------------

## Installation of the graph :

Get dependencies using [Bower](http://bower.io/) and Browserify (via npm and grunt):

```
bower install
npm install
grunt build
```

## How to use FileUploader :

```
cd FileUploader
npm install
node Server.js
run your favorite web browser on localhost:3000
```

Problem : css and images are not working on that way

# TODO

`docker run -it -p 3000:3000 --volume-driver=glusterfs --volume /uploads:/uploads --name fileuploader fileuploader`

- share /script/mkWorkflow & /uploads
