#!/usr/bin/env bash
set -euo pipefail

REQUIRED_NODE="v20.17.0"
REQUIRED_PNPM="9.12.0"

if ! command -v node >/dev/null 2>&1; then
  echo "node is required" >&2
  exit 1
fi

if ! command -v corepack >/dev/null 2>&1; then
  echo "corepack is required" >&2
  exit 1
fi

NODE_VERSION="$(node -v)"
if [[ "$NODE_VERSION" != "$REQUIRED_NODE" ]]; then
  echo "Expected Node ${REQUIRED_NODE}, got ${NODE_VERSION}" >&2
  echo "Use: nvm install && nvm use" >&2
  exit 1
fi

corepack enable
corepack prepare "pnpm@${REQUIRED_PNPM}" --activate

INSTALLED_PNPM="$(pnpm -v)"
if [[ "$INSTALLED_PNPM" != "$REQUIRED_PNPM" ]]; then
  echo "Expected pnpm ${REQUIRED_PNPM}, got ${INSTALLED_PNPM}" >&2
  exit 1
fi

echo "Environment check passed"
pnpm install
