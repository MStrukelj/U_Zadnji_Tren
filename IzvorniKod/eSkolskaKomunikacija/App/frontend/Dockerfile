# Base image for Node.js
FROM node:22 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files and build
COPY . .
RUN npm run build

# Serve static files using Nginx
FROM nginx:alpine

# Retry pulling the base image to avoid intermittent issues
ARG NGINX_ALPINE_IMAGE=nginx:alpine
RUN docker pull $NGINX_ALPINE_IMAGE || true

# Copy build output to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
