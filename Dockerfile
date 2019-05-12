FROM node:9-stretch
LABEL description="this image builds chappie :)"

# use changes to package.json to force docker not to use the cache
# this is more efficient as we avoid reinstalling all packages in every build.
ADD ./src/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/chappie && cp -a /tmp/node_modules /usr/src/chappie

WORKDIR /usr/src/chappie
ADD ./src/ ./

# experimental-modules enables ES6
CMD ["node", "--experimental-modules", "app.mjs"]