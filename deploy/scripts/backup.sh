#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/srv/powermicros}"
BACKUP_DIR="${BACKUP_DIR:-/srv/powermicros-backups}"
TIMESTAMP="$(date -u +%Y%m%dT%H%M%SZ)"

mkdir -p "$BACKUP_DIR"
cd "$APP_DIR"

docker compose --env-file .env.production exec -T db \
  pg_dump -U powermicros -d powermicros \
  | gzip > "$BACKUP_DIR/powermicros-db-$TIMESTAMP.sql.gz"

docker run --rm \
  -v powermicros_uploads:/uploads:ro \
  -v "$BACKUP_DIR:/backups" \
  alpine:3.20 \
  tar -czf "/backups/powermicros-uploads-$TIMESTAMP.tgz" -C /uploads .

find "$BACKUP_DIR" -type f -name 'powermicros-*' -mtime +14 -delete
