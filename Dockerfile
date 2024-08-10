# Use the official Node.js slim image as the base image
FROM node:8-slim

# Install coin-hive-stratum globally with the necessary permissions
RUN npm i -g coin-hive-stratum --unsafe-perm=true --allow-root

# Expose the port that the application will run on
EXPOSE 8892

# Command to run coin-hive-stratum with the specified options
ENTRYPOINT ["coin-hive-stratum", "8892", "--host=pool.supportxmr.com", "--port=3333"]
