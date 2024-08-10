# Use the official Node.js slim image as the base image
#FROM node:8-slim

# Install coin-hive-stratum globally with the necessary permissions
#RUN npm i -g coin-hive-stratum --unsafe-perm=true --allow-root

# Expose the port that the application will run on
#EXPOSE 8892

# Command to run coin-hive-stratum with the specified options
#ENTRYPOINT ["coin-hive-stratum", "8892", "--host=pool.supportxmr.com", "--port=3333"]

# Use the Puppeteer base image
FROM ghcr.io/puppeteer/puppeteer:22.9.0

# Set environment variables to skip downloading Chromium and set the executable path
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies using npm ci
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Command to run the application
CMD [ "node", "index.js" ]
