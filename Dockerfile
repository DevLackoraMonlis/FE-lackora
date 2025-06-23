
# ============================
# 1st Stage: Build Stage
# ============================
FROM dockerhub.behinrahkar.com/node:20.9.0-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy only required files for installing dependencies
COPY ["package.json", ".npmrc", "./"]

# Install dependencies
RUN npm install --loglevel verbose --force

# Copy all files except those ignored by .dockerignore
COPY . .

# Set production environment
ENV NODE_ENV=production

# Build the application
RUN npm run lint-prod
RUN npm run build --loglevel verbose

# ============================
# 2nd Stage: Production Image
# ============================
FROM dockerhub.behinrahkar.com/node:20.9.0-alpine AS runner

# Set the working directory inside the container
WORKDIR /app


# Copy only the standalone folder and required assets from the builder stage
COPY --from=builder /app/.next/standalone ./.next/standalone
COPY --from=builder /app/public ./.next/standalone/public
COPY --from=builder /app/.next/static ./.next/standalone/.next/static

# Expose the application port
EXPOSE 3000

# Start the Next.js standalone server
CMD ["node", ".next/standalone/server.js"]
