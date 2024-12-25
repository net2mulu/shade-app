FROM node:latest 

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN yarn install 

COPY . .
RUN yarn global add serve --verbose
RUN yarn run build 


CMD  serve -s build -l 3000
