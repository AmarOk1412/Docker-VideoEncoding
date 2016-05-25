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

Pour résumer, ce projet est composé d'un cluster de raspberry pi qui font tourner une instance de glusterfs afin d'avoir un espace de fichier partagé. Un des raspberrys (node1) fait tourner une interface web dans lequel l'utilisateur peut envoyer un fichier a encoder. Ce docker lance un processus (split/encode/merge) où les containers sont gérés par DockerSwarm. Enfin, the-graph sert à la visualisation des états des containers.

# Monter sa propre instance

## Préparation d'un RaspberryPi

## FileUploader

## Utilisation

Sur le node 1, il suffit de faire tourner le docker fileuploader avec la commande suivante : `docker run -it -p 3000:3000 --volume-driver=glusterfs --volume uploads:/uploads --name fileuploader fileuploader`

Ce qui donnera pour interface : ![fileuploader](rsc/fileuploader.png)

Les fichers seront uploadés dans le dossier uploads du glusterfs.

## Fonctionnement interne

Le serveur est développé avec nodejs (le code source se trouve dans _/FileUploader_). Lors de l'envoie d'un fichier, 2 fichiers sont ajoutés sur le serveur. Un fichier de la forme toEncode_$DATE$ qui est le fichier uploadé et un .json contenant :

```json
{
  "toEncode":"toEncode_1464009095314",
  "original_name":"$ORIGINALNAME$",
  "wanted_name":"$WANTEDNAME$",
  "bitrate":"$BITRATE$"
}
```

## L'encodage d'une vidéo

### Split

### Encode

### Merge

## DockerSwarm

Cette partie du projet sert à réaliser le scheduling temporel des containers.

### Utilisation

Pour lancer un container sur le swarm : `docker -H tcp://$IPADD:2375 run -d -P --name NAME IMAGE`

Il est possible de faire en sorte qu'un container attende qu'un autre soit finit avec `-e waitfor:container==NAME`. Ainsi par exemple `docker -H tcp://$IPADD:2375 run -d -P -e waitfor:container==h1 --name h2 armhf/hello-world` va créer un container h2 qui attendra que le container h1 soit arrêté.

### Fonctionnement interne

Le code source est disponible dans le module du dossier _/swarm_, principalement dans le dossier _swarm/cluster/state/_. Lors de l'appel à la méthode run, swarm vérifie si toutes les dépendances sont terminées, sinon le container est rajouté à une liste de containers bloqués. À chaque fois qu'un container termine, les dépendances sont vérifiées. Si on peut lancer un container bloqué car toutes les dépendances sont résolues, on le fait.

## The-Graph

# Fonctionnalités

## Fonctionnalités existantes

- Upload de fichiers sur le glusterfs
- Choix du bitrate depuis l'interface web
- Split/Merge d'une vidéo
- waitfor pour le swarm

## TODOList

- Relier au swarm custom du projet.
- Encoder une vidéo

# Licence

```
DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
            Version 2, December 2004

Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>

Everyone is permitted to copy and distribute verbatim or modified
copies of this license document, and changing it is allowed as long
as the name is changed.

    DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

0\. You just DO WHAT THE FUCK YOU WANT TO.
```

--------------------------------------------------------------------------------

## Installation of the graph :

Get dependencies using [Bower](http://bower.io/) and Browserify (via npm and grunt):

```
bower install
npm install
grunt build
```

# TODO

`docker run -it -p 3000:3000 --volume-driver=glusterfs --volume uploads:/uploads --name fileuploader fileuploader`

`docker run -it --volume-driver=glusterfs --volume uploads:/uploads --name split split /bin/bash ScriptSplit.sh $FILENAME$ $NB$`

`docker run --rm -it --volume-driver=glusterfs --volume uploads:/uploads --name merge merge /bin/bash ScriptMerge.sh $FILENAME$`

- share /script/mkWorkflow & /uploads
