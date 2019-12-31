CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;
COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';

-- Projects
CREATE TABLE projects (
  id uuid DEFAULT gen_random_uuid() NOT NULL,
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

INSERT INTO projects(name)
SELECT 'chance';

-- Charges
CREATE TABLE IF NOT EXISTS charges
(
	id SERIAL NOT NULL,
	amount INT NOT NULL,
	date TIMESTAMPTZ NOT NULL,
  	name VARCHAR(50) NOT NULL,
	description VARCHAR(255) NOT NULL,
	type CHAR(2) NOT NULL
);

CREATE UNIQUE INDEX charges_id_uindex
	ON charges (id);

ALTER TABLE charges
	ADD CONSTRAINT charges_pk
		PRIMARY KEY (id);
