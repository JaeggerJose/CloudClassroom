# Use a Node.js base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React app

# Expose the desired port (e.g., 3000) for the application
EXPOSE 3000

# Set the command to run when the container starts
CMD [ "npm", "start" ]

