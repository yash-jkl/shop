FROM node:18

# COPY package*.json ./

COPY . .
RUN npm install

RUN npm run build
# RUN npm run migrations:run 

CMD ["npm", "run", "start:dev"]
