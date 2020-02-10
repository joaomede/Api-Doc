FROM joaomede/nodejs12prod:1.0

MAINTAINER João Medeiros <symbol2studio@gmail.com>
LABEL maintainer="João Medeiros <symbol2studio@gmail.com>"

COPY dist /usr/src/app/dist
COPY node_modules /usr/src/app/node_modules
COPY package.json /usr/src/app/package.json
COPY yarn.lock /usr/src/app/yarn.lock
COPY view/dist /usr/src/app/view/dist
COPY scripts/init.sh /usr/src/app/init.sh

ENTRYPOINT [ "./init.sh" ]
