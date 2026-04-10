FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile --prefer-offline

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Do NOT use standalone mode - it breaks instrumentation for Elastic APM
# ENV NEXT_OUTPUT=standalone

ARG NEXT_PUBLIC_SALEOR_API_URL
ENV NEXT_PUBLIC_SALEOR_API_URL=${NEXT_PUBLIC_SALEOR_API_URL}
ARG NEXT_PUBLIC_STOREFRONT_URL
ENV NEXT_PUBLIC_STOREFRONT_URL=${NEXT_PUBLIC_STOREFRONT_URL}
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}
ARG NEXT_PUBLIC_DEFAULT_CHANNEL=default-channel
ENV NEXT_PUBLIC_DEFAULT_CHANNEL=${NEXT_PUBLIC_DEFAULT_CHANNEL}

# Mailjet environment variables for build time
ARG MAILJET_API_KEY
ENV MAILJET_API_KEY=${MAILJET_API_KEY}
ARG MAILJET_SECRET_KEY
ENV MAILJET_SECRET_KEY=${MAILJET_SECRET_KEY}
ARG MAILJET_LIST_ID
ENV MAILJET_LIST_ID=${MAILJET_LIST_ID}
ARG MAILJET_FROM_EMAIL
ENV MAILJET_FROM_EMAIL=${MAILJET_FROM_EMAIL}
ARG MAILJET_SEND_WELCOME
ENV MAILJET_SEND_WELCOME=${MAILJET_SEND_WELCOME}

# Elastic APM environment variables for build time (configuration happens at runtime via K8s env vars)
# Build time defaults - actual values come from K8s deployment
ARG ELASTIC_APM_ENABLED=false
ENV ELASTIC_APM_ENABLED=${ELASTIC_APM_ENABLED}

# Get PNPM version from package.json
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Run pnpm build which triggers prebuild (codegen) then next build
RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_SALEOR_API_URL
ENV NEXT_PUBLIC_SALEOR_API_URL=${NEXT_PUBLIC_SALEOR_API_URL}
ARG NEXT_PUBLIC_STOREFRONT_URL
ENV NEXT_PUBLIC_STOREFRONT_URL=${NEXT_PUBLIC_STOREFRONT_URL}
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ENV NEXT_PUBLIC_GA_MEASUREMENT_ID=${NEXT_PUBLIC_GA_MEASUREMENT_ID}

# Mailjet environment variables for runtime
ARG MAILJET_API_KEY
ENV MAILJET_API_KEY=${MAILJET_API_KEY}
ARG MAILJET_SECRET_KEY
ENV MAILJET_SECRET_KEY=${MAILJET_SECRET_KEY}
ARG MAILJET_LIST_ID
ENV MAILJET_LIST_ID=${MAILJET_LIST_ID}
ARG MAILJET_FROM_EMAIL
ENV MAILJET_FROM_EMAIL=${MAILJET_FROM_EMAIL}
ARG MAILJET_SEND_WELCOME
ENV MAILJET_SEND_WELCOME=${MAILJET_SEND_WELCOME}

# Elastic APM - all configuration comes from K8s environment variables at runtime
# No build-time ARGs needed since APM agent reads from process.env at startup

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the full build output (not standalone) for proper instrumentation support
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
