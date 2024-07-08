# Use the official node image as the base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

ENV VITE_API_URL=$VITE_API_URL
ENV NODE_ENV=production

EXPOSE 8080

# Command to start the Vite preview
CMD ["npm", "run", "preview"]
