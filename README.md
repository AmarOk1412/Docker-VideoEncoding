# Docker-VideoEncoding

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
