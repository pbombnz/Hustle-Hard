FROM node:latest

# Copy local files and directories into the remote working directory.
WORKDIR /usr/src/app
ADD ./ ./

# Install modules and build application.
RUN npm install --silent
RUN npm run prestart

# Expose web service and debugging ports
EXPOSE 8080
EXPOSE 9229

# Run Node with inspect flag.
CMD ["npm", "run", "debug-node"]