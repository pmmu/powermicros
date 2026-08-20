# PowerMicros IONOS VPS Deploy

Runtime:

- nginx on the host terminates HTTP/HTTPS
- PowerMicros runs on `127.0.0.1:3002`
- Postgres runs in Docker and is private to the Compose network
- Backups are written to `/srv/powermicros-backups`

First deploy:

```bash
cd /srv/powermicros
cp .env.production.example .env.production
chmod 600 .env.production
docker compose --env-file .env.production build
docker compose --env-file .env.production up -d db
docker compose --env-file .env.production run --rm migrate
docker compose --env-file .env.production up -d web
cp deploy/nginx/powermicros.conf /etc/nginx/sites-available/powermicros
ln -s /etc/nginx/sites-available/powermicros /etc/nginx/sites-enabled/powermicros
nginx -t
systemctl reload nginx
certbot --nginx -d powermicros.com -d www.powermicros.com
```

Run backups:

```bash
deploy/scripts/backup.sh
```
