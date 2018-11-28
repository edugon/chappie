FROM node:latest
LABEL description="this image builds node discord chatbot"

# use changes to package.json to force docker not to use the cache
# this is more efficient as we avoid reinstalling all packages in every build
ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/discord-bot && cp -a /tmp/node_modules /usr/src/discord-bot

WORKDIR /usr/src/discord-bot
ADD ./ ./

CMD ["node", "bot.js"]