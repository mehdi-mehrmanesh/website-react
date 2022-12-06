FROM node:14.19.0
COPY . /work
WORKDIR /work
RUN npm install 
RUN npm run build
EXPOSE 3000
CMD npm run start