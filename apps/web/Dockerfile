# TALAL·AT website and admin (Next.js, standalone output). Build from the repository root:
#   docker build -f apps/web/Dockerfile -t talal-at-web .
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
COPY packages/shared/package.json packages/shared/
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN npm ci --workspace @talal-at/shared --workspace @talal-at/web --no-audit --no-fund

FROM deps AS build
ARG NEXT_PUBLIC_SITE_URL=http://localhost
ENV NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY packages/shared packages/shared
COPY apps/web apps/web
# the API is not running during the build, so pages are pre-rendered from the seed content
# and refreshed from the database within a minute of the first visit
RUN npm run build -w @talal-at/shared && npm run build -w @talal-at/web

FROM node:22-alpine AS runtime
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
WORKDIR /app
COPY --from=build --chown=node:node /app/apps/web/.next/standalone ./
COPY --from=build --chown=node:node /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=node:node /app/apps/web/public ./apps/web/public
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=20s --retries=5 CMD wget -qO- http://127.0.0.1:3000/robots.txt >/dev/null || exit 1
CMD ["node", "apps/web/server.js"]
