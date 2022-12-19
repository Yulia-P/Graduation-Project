FROM node:18.0.0

WORKDIR /vesuviusfront

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm i  --save --legacy-peer-deps

COPY . .

CMD ["npm", "start"]