DO $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN (SELECT table_name FROM information_schema.tables WHERE table_schema = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(rec.table_name) || ' CASCADE';
    END LOOP;
END $$;

