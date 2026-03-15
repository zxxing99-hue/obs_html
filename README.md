# Live Production Studio (Prototype Scaffold)

A browser-based live production studio inspired by desktop switchers.

> Current maturity: **prototype scaffold**.

## Package responsibilities

- `apps/studio`: Web UI and orchestration layer for scenes, sources, preview, and error surfacing.
- `packages/domain`: Domain logic (scene/source model + autosave service), framework agnostic.
- `packages/media`: Browser media capability adapter (device enumeration and stream acquisition).

## Runtime/toolchain requirements

- Node `20.17.0` (`.nvmrc` and `.node-version` are provided)
- pnpm `9.12.0` (activated via Corepack)

## Setup

```bash
nvm install
nvm use
pnpm setup
pnpm install
```

## Development

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Test

```bash
pnpm test
```

## CI-equivalent local run

```bash
pnpm ci
```

## Docker

```bash
docker compose up --build
```

Open http://localhost:8080.

## Network-restricted environments

If package installation fails due proxy/registry policies:

1. Configure `.npmrc` to point at your internal npm mirror.
2. Ensure outbound access to both `registry.npmjs.org` and tarball endpoints.
3. Keep `NODE_EXTRA_CA_CERTS` and corporate CA trust configured when TLS interception is enabled.
