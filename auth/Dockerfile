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
RUN mkdir auth
WORKDIR /root/auth
COPY ./package.json /root/auth
COPY ./package-lock.json /root/auth
RUN npm i

# Copy source code
COPY . /root/auth

ENTRYPOINT [ "node", "." ]