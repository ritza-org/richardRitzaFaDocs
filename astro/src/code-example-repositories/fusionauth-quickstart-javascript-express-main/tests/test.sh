#!/usr/bin/env bash
set -euo pipefail

for STEP_DIR in express-app-steps/*/; do
  STEP_NAME=$(basename "$STEP_DIR")
  echo "Syntax-checking $STEP_NAME..."
  docker run --rm -v "$(pwd)/$STEP_DIR:/app" -w /app node:26 sh -c "npm install && node --check express-app.js"
done

echo "Basic syntax validation complete."
