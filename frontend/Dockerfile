FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

# Pour un build de production, décommente la ligne suivante :
# RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]

# Si tu veux lancer en production après build, tu utiliseras :
# CMD ["npm", "run", "start"]
