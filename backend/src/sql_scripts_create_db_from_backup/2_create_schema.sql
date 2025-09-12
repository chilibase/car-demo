-- spustene uz nad vytvorenou DB:
-- v novovytvorenej DB dropneme schemu public (odporuca sa pouzivat vlastnu schemu)
DROP SCHEMA public;

-- vytvorenie schemy (treba spustit nad prazdnou DB - vytvorenou napr. cez 1_drop_and_create_db.sql)
CREATE SCHEMA car_demo;

ALTER SCHEMA car_demo OWNER TO postgres;

-- funkcia unaccent pouzivana vo full-text search
CREATE EXTENSION unaccent schema car_demo;
