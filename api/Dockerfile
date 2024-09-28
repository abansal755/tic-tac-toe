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

# Install dependencies
RUN mkdir api
WORKDIR /root/api
COPY ./package.json /root/api
COPY ./package-lock.json /root/api
RUN npm i

# Copy source code
COPY . /root/api

ENTRYPOINT [ "node", "." ]