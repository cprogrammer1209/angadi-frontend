# Step 1: Build Angular app
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire Angular project
COPY . .

# Build the Angular app in production mode
RUN npm run build -- --configuration production


# Step 2: Serve app with NGINX
FROM nginx:alpine

# Copy the Angular build output to NGINX's HTML folder
COPY --from=build /app/dist/Frontend /usr/share/nginx/html

# Expose the port
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]
