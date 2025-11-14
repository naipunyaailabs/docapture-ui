# 1. Dependency installation + build stage
FROM oven/bun:1 AS builder

# Create app directory
WORKDIR /app

# Copy only package files first (for caching)
COPY package.json bun.lockb ./

# Install dependencies using Bun (fast & cached)
RUN bun install --frozen-lockfile

# Copy entire project
COPY . .

# Build the Next.js project (uses SWC / Turbopack depending on config)
RUN bun run build



# 2. Production runtime stage
FROM oven/bun:1 AS runner

WORKDIR /app

# Only copy built artifacts + prod deps
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb ./bun.lockb

# Install only production deps
RUN bun install --production --frozen-lockfile

# Expose port (Next.js default)
EXPOSE 3000

# Start Next.js (uses Bun runtime)
CMD ["bun", "run", "start"]
