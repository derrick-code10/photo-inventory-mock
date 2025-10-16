FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first for caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of your source code
COPY . .

# Expose the Vite dev server port
EXPOSE 8000

# Run the Vite dev server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "8000", "--open", "false"]

