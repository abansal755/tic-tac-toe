# This dockerfile is for serving ui
FROM ubuntu:latest

# Install curl
RUN apt-get update
RUN apt-get upgrade -y
RUN apt install curl -y

# Install node
WORKDIR /root
RUN curl -sL https://deb.nodesource.com/setup_20.x -o /tmp/nodesource_setup.sh
RUN bash /tmp/nodesource_setup.sh
RUN apt install nodejs -y

# Install dependencies for ui
RUN mkdir client
WORKDIR /root/client
COPY ./client/package.json /root/client/
COPY ./client/package-lock.json /root/client/
RUN npm i

# Install dependencies for server
WORKDIR /root
RUN mkdir serve
WORKDIR /root/serve
COPY ./serve/package.json /root/serve
COPY ./serve/package-lock.json /root/serve/
RUN npm i

# Build
WORKDIR /root/client
COPY ./client /root/client
ARG REACT_APP_AUTH_SERVER_URL
ENV REACT_APP_AUTH_SERVER_URL=$REACT_APP_AUTH_SERVER_URL
ARG REACT_APP_API_SERVER_URL
ENV REACT_APP_API_SERVER_URL=$REACT_APP_API_SERVER_URL
RUN npm run build

# Setup node server for serving the build
WORKDIR /root/serve
COPY ./serve /root/serve

ENTRYPOINT ["node", "."]