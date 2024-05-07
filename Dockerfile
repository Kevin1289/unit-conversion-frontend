# Use the official Node.js image as a base
FROM node:latest as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight Node.js image for the production environment
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the build files from the previous stage
COPY --from=build /app/build ./build

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npx", "serve", "-s", "build"]
