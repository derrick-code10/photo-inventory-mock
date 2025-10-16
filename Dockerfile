# Stage 1: Build the React + Vite app
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Serve the app
FROM node:20-alpine

WORKDIR /app

# Install serve package globally
RUN npm install -g serve

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Expose port 8000
EXPOSE 8000

# Start the app using serve
CMD ["serve", "-s", "dist", "-l", "8000"]

