#!/bin/sh
# script vytvara backup dat aplikacie - databazu backup-uje pomocou pg_dump a subory zipuje dokopy
#
# v pripade zmien treba tento subor manualne kopirovat na server do adresara /home/run-env/car-demo-prod/backup
# subor musi mat nastavene pravo na spustenie (napr. prikazom chmod u+x create-backup.sh)
#
# spustame kazdu noc ("0 3 * * *" - bezi o 3:00), bezi niekolko sekund
# -> v crontab-e je zapisany riadok:
# 0 3 * * * /home/run-env/car-demo-prod/backup/create-backup.sh
#
# crontab sa edituje prikazom "crontab -e" (v lubovolnom adresari)
# ci zbehol batch sa da pozriet v log subore /var/log/syslog
#
# subor bezi mimo dockeru (pouzivame aj cron mimo dockeru), zevraj je to korektnejsie riesenie ako pchat cron scripty do containerov (su na jednom mieste a pouziva sa jeden cron)
# tooly vo vnutri containera (napr. pg_dump) spustame pomocou prikazu: docker exec <container-name> <cmd>
# ak uz chceme mat/spustat cron scripty vo vnutri containera, odporuca sa vytvorit samostatny container ktory bude spustat len cron scripty (zatial ale pouzijeme cron na (hlavnom) linuxe)
#
# backup subory sa zapisuju do adresara data, budeme drzat subory za poslednych 14 dni, starsie mazeme

# nastavime sa aktualneho adresara (mozno to ide aj nejak inac urobit)
cd /home/run-env/car-demo-prod/backup

# ***************** backup databazy *****************

now=$(date +"%Y-%m-%d_%H-%M-%S")
# parametre:
# -Fc je binarny custom format
# -c prida drop prikazy pre db objekty (tabulky) do backupu

# priame pouzitie pg_dump (musi byt nainstalovany na linuxe a heslo k DB musi byt zapisane v ~/.pgpass)
#pg_dump -U postgres -d car_demo_db -h localhost -p 5433 -Fc -c > "./data/car-demo-db_$now.bak"
# pouzijeme pg_dump containera postgresdb
docker exec postgresdb pg_dump -U postgres -d car_demo_db -Fc -c > "./data/car-demo-db_$now.bak"

# ***************** backup suborov *****************

# nastavime sa na adresar kam sa zapisuju subory - aby spravne vytvoril adresarovu strukturu v zip subore, tak to treba takto urobit
cd /var/lib/docker/volumes/car-demo_backend-file-volume/_data
now=$(date +"%Y-%m-%d_%H-%M-%S")
# zozipujeme aktualny adresar .
zip -r -q "/home/run-env/car-demo-prod/backup/data/car-demo-files_$now.zip" .

# ************ vymazanie starych backup suborov ***********

# znova naspet aktualny adresar
cd /home/run-env/car-demo-prod/backup
# remove all files (type f) modified longer than 14 days ago under /data
find ./data -type f -mtime +14 -delete
