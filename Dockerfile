# 1. Builder stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package metadata
# bun.lockb is optional, wildcard prevents checksum failure
COPY package.json bun.lockb* ./

# Install deps (tries frozen first, falls back if lock missing)
RUN bun install --frozen-lockfile || bun install

# Copy source code
COPY . .

# Build args
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_AUTH_API_BASE_URL
ARG NEXT_PUBLIC_APP_NAME
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_SUPPORT_EMAIL

# Set env vars for build
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_AUTH_API_BASE_URL=$NEXT_PUBLIC_AUTH_API_BASE_URL
ENV NEXT_PUBLIC_APP_NAME=$NEXT_PUBLIC_APP_NAME
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_SUPPORT_EMAIL=$NEXT_PUBLIC_SUPPORT_EMAIL

# Build Next.js
RUN bun run build



# 2. Runner stage (production)
FROM oven/bun:1 AS runner

WORKDIR /app

# Copy built output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb* ./bun.lockb

# Install only prod dependencies
RUN bun install --production --frozen-lockfile || bun install --production

EXPOSE 3000

CMD ["bun", "run", "start"]
