-- script na dropnutie a vytvorenie DB (mozme spustit v DBeaver nad cudzou DB)
-- ak spustate vytvorenie DB prvykrat, zakomentujte "DROP DATABASE car_demo_db;"
-- (databazu mozte vytvorit aj priamo v toole)

DROP DATABASE car_demo_db;

-- spustene nad cudzou DB:
CREATE DATABASE "car_demo_db"
WITH OWNER "postgres"
ENCODING 'UTF8'
LC_COLLATE = 'en-GB.UTF8'
LC_CTYPE = 'en-GB.UTF8'
TEMPLATE template0;
