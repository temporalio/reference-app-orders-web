FROM node:20-slim AS web-builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

FROM web-builder AS web-builder-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM web-builder AS web-builder-build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM web-builder AS web
EXPOSE 3000
COPY --from=web-builder-build /app/build /app
COPY --from=web-builder-deps /app/node_modules /app/node_modules
CMD ["node", "/app"]
