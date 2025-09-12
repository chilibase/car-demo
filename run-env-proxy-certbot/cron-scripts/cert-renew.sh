#!/bin/sh
# v pripade zmien treba tento subor manualne kopirovat na server do adresara /home/run-env-proxy-certbot/cron-scripts
# subor musi mat nastavene pravo na spustenie (napr. prikazom chmod u+x cert-renew.sh)
#
# do 90 dni treba obnovit https certifikat (a obnovuje sa 30 dni pred expiraciou), preto spustame tento script vzdy 1. a 15. v mesiaci ("0 2 1,15 * *" - bezi 1.1. o 2:00, 15.1. o 2:00, 1.2. o 2:00, ...)
# -> v crontab-e je zapisany riadok:
# 0 2 1,15 * * /home/run-env-proxy-certbot/cron-scripts/cert-renew.sh
#
# crontab sa edituje prikazom "crontab -e" (v lubovolnom adresari)
# ci zbehol batch sa da pozriet v log subore /var/log/syslog
#
# nastavime sa do adresara s docker compose suborom
cd /home/run-env-proxy-certbot/certbot
# prikaz na renew cert (zafunguje pre certfikaty vsetkych domen, ukaze datum kedy vyprsi cert, --rm vymaze skoncene container-y):
docker compose run --rm  certbot renew
# restartneme pre istotu proxy-nginx
cd /home/run-env-proxy-certbot/proxy-nginx
docker compose down
docker compose up -d
# restartneme (pre istotu) backend a frontend - obidva pouzivaju certifikat - projekt car-demo-prod
cd /home/run-env/car-demo-prod
docker compose -f docker-compose-run.yml down backend frontend
docker compose -f docker-compose-run.yml up -d backend frontend
# restartneme (pre istotu) backend a frontend - obidva pouzivaju certifikat - projekt car-demo-test
#cd /home/run-env/car-demo-test
#docker compose -f docker-compose-run.yml down backend-test frontend-test
#docker compose -f docker-compose-run.yml up -d backend-test frontend-test
