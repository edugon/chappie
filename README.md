# chappie
[![pipeline status](https://gitlab.com/edugon/chappie/badges/master/pipeline.svg)](https://gitlab.com/edugon/chappie/commits/master) [![coverage report](https://gitlab.com/edugon/chappie/badges/master/coverage.svg)](https://gitlab.com/edugon/chappie/commits/master)

### About
Chappie is just a chatbot for discord servers :)

### Prerequisites
- **[Node.js](https://nodejs.org/en/download/)** (if not using Docker).
- **[Docker Engine](https://docs.docker.com/engine/)** (tested with v18.06.1-ce).
- **[Git](https://git-scm.com/downloads)** version-control system.

### Deployment
1. Clone this respository into your workspace: ``$ git clone git@gitlab.com:edugon/discord-bot.git``.
2. Build Docker image: ``$ docker build -t chappie .``.
3. Run Docker container: ``$ docker run --name chappie chappie``.
4. If you are not using Docker, just run: ``$ npm install && node app.js``
5. Enjoy! :)