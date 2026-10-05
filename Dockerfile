# syntax=docker/dockerfile:1.7
# Quarau web (Next.js 16 + Payload 3) — multi-stage, standalone output, non-root runtime.

ARG NODE_VERSION=22.22.0

FROM node:${NODE_VERSION}-bookworm-slim AS base
ENV PNPM_HOME=/pnpm PATH=/pnpm:$PATH NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare pnpm@10.28.0 --activate
WORKDIR /repo

# ---------- dependencies (cached on lockfile) ----------
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json .npmrc ./
COPY apps/web/package.json apps/web/
COPY packages/ui/package.json packages/ui/
COPY packages/emails/package.json packages/emails/
COPY packages/config/package.json packages/config/
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# ---------- build ----------
FROM deps AS build
COPY . .
ARG APP_VERSION=dev
ARG NEXT_PUBLIC_ENABLED_LOCALES=pt
ARG NEXT_PUBLIC_TURNSTILE_SITE_KEY=
ARG NEXT_PUBLIC_SENTRY_DSN=
ARG NEXT_PUBLIC_UMAMI_ORIGIN=
ENV NODE_ENV=production APP_VERSION=${APP_VERSION} \
    NEXT_PUBLIC_ENABLED_LOCALES=${NEXT_PUBLIC_ENABLED_LOCALES} \
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=${NEXT_PUBLIC_TURNSTILE_SITE_KEY} \
    NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN} \
    NEXT_PUBLIC_UMAMI_ORIGIN=${NEXT_PUBLIC_UMAMI_ORIGIN} \
    # Build needs no database: pages render on first request (ISR).
    DATABASE_URL=postgres://build:build@127.0.0.1:1/build \
    PAYLOAD_SECRET=build-time-placeholder-secret
RUN pnpm --filter @quarau/web build

# ---------- tools image (migrate:wp, reindex, admin seed) ----------
FROM build AS tools
ENV NODE_ENV=production
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /repo/apps/web
CMD ["pnpm", "migrate:wp"]

# ---------- runtime ----------
FROM node:${NODE_VERSION}-bookworm-slim AS runner
ARG APP_VERSION=dev
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0 APP_VERSION=${APP_VERSION}
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates tini && rm -rf /var/lib/apt/lists/* \
    && groupadd --system --gid 1001 app && useradd --system --uid 1001 --gid app --home /app app
WORKDIR /app
COPY --from=build --chown=app:app /repo/apps/web/.next/standalone ./
COPY --from=build --chown=app:app /repo/apps/web/.next/static ./apps/web/.next/static
COPY --from=build --chown=app:app /repo/apps/web/public ./apps/web/public
# Barlow WOFF files are read at runtime by the OG image route.
COPY --from=build --chown=app:app /repo/apps/web/src/fonts ./apps/web/src/fonts
RUN mkdir -p /app/apps/web/.next/cache /app/apps/web/media && chown -R app:app /app/apps/web/.next/cache /app/apps/web/media
USER app
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=4 CMD curl -fsS http://127.0.0.1:3000/next/health || exit 1
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["node", "apps/web/server.js"]
