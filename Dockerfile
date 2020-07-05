FROM joaomede/nodejs12prod:1.0

MAINTAINER João Medeiros <symbol2studio@gmail.com>
LABEL maintainer="João Medeiros <symbol2studio@gmail.com>"

COPY api/dist /usr/src/app/api/dist
COPY api/node_modules /usr/src/app/api/node_modules
COPY api/package.json /usr/src/app/api/package.json
COPY api/yarn.lock /usr/src/app/api/yarn.lock
COPY view/dist /usr/src/app/view/dist
COPY scripts/init.sh /usr/src/app/init.sh

ENTRYPOINT [ "./init.sh" ]
