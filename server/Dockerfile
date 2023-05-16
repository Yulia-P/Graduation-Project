FROM node:18.0.0

WORKDIR /vesuviusserver

COPY ../package.json package.json
COPY ../package-lock.json package-lock.json

RUN npm install

COPY server .

CMD ["node", "server.js"]