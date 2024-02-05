-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial4 NOT NULL,
	"name" text NOT NULL,
	email text NOT NULL,
	"password" text NOT NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	avatar text NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- public.lists definition

-- Drop table

-- DROP TABLE public.lists;

CREATE TABLE public.lists (
	id serial4 NOT NULL,
	title text NOT NULL,
	description text NULL,
	image text NULL,
	heroes json NULL,
	user_id int4 NOT NULL,
	CONSTRAINT lists_pkey PRIMARY KEY (id)
);


-- public.lists foreign keys

ALTER TABLE public.lists ADD CONSTRAINT lists_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);

-- public.user_tokens definition

-- Drop table

-- DROP TABLE public.user_tokens;

CREATE TABLE public.user_tokens (
	id serial4 NOT NULL,
	"token" text NOT NULL,
	user_id int4 NOT NULL,
	created_at timestamptz NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT user_tokens_pkey PRIMARY KEY (id)
);


-- public.user_tokens foreign keys

ALTER TABLE public.user_tokens ADD CONSTRAINT user_tokens_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id);