#!/bin/sh
set -eu

ROOT=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$ROOT"

# :8081 is QA-only; a revive must never inherit a stale built-output preview.
node scripts/preview.mjs stop >/dev/null 2>&1 || true

if command -v curl >/dev/null 2>&1 && curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi

npm run dev >>"${TMPDIR:-/tmp}/five-startup.log" 2>&1 &
