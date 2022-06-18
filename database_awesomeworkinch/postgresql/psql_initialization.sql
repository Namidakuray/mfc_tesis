--
-- PostgreSQL database dump
--

-- Dumped from database version 12.11
-- Dumped by pg_dump version 12.11

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: address; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.address (
    id integer NOT NULL,
    country_id integer NOT NULL,
    region_id integer NOT NULL,
    city_id integer NOT NULL,
    street_avenue character varying NOT NULL,
    number integer
);


ALTER TABLE public.address OWNER TO testpsql_user;

--
-- Name: address_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.address_id_seq OWNER TO testpsql_user;

--
-- Name: address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.address_id_seq OWNED BY public.address.id;


--
-- Name: allow; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.allow (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public.allow OWNER TO testpsql_user;

--
-- Name: allow_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.allow_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.allow_id_seq OWNER TO testpsql_user;

--
-- Name: allow_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.allow_id_seq OWNED BY public.allow.id;


--
-- Name: allow_rol; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.allow_rol (
    id integer NOT NULL,
    allow_id integer NOT NULL,
    rol_id integer NOT NULL
);


ALTER TABLE public.allow_rol OWNER TO testpsql_user;

--
-- Name: allow_rol_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.allow_rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.allow_rol_id_seq OWNER TO testpsql_user;

--
-- Name: allow_rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.allow_rol_id_seq OWNED BY public.allow_rol.id;


--
-- Name: city; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.city (
    id integer NOT NULL,
    name character varying NOT NULL,
    region_id integer NOT NULL
);


ALTER TABLE public.city OWNER TO testpsql_user;

--
-- Name: city_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.city_id_seq OWNER TO testpsql_user;

--
-- Name: city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.city_id_seq OWNED BY public.city.id;


--
-- Name: company; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.company (
    id integer NOT NULL,
    rut character varying NOT NULL,
    status character varying NOT NULL,
    oficial_name character varying NOT NULL,
    commercial_name character varying NOT NULL,
    address_id integer NOT NULL
);


ALTER TABLE public.company OWNER TO testpsql_user;

--
-- Name: company_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.company_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.company_id_seq OWNER TO testpsql_user;

--
-- Name: company_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.company_id_seq OWNED BY public.company.id;


--
-- Name: country; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.country (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.country OWNER TO testpsql_user;

--
-- Name: country_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.country_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.country_id_seq OWNER TO testpsql_user;

--
-- Name: country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.country_id_seq OWNED BY public.country.id;


--
-- Name: region; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.region (
    id integer NOT NULL,
    name character varying NOT NULL,
    country_id integer NOT NULL
);


ALTER TABLE public.region OWNER TO testpsql_user;

--
-- Name: region_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.region_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.region_id_seq OWNER TO testpsql_user;

--
-- Name: region_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.region_id_seq OWNED BY public.region.id;


--
-- Name: rol; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.rol (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public.rol OWNER TO testpsql_user;

--
-- Name: rol_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.rol_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_id_seq OWNER TO testpsql_user;

--
-- Name: rol_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.rol_id_seq OWNED BY public.rol.id;


--
-- Name: rol_user; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.rol_user (
    id integer NOT NULL,
    user_id integer NOT NULL,
    rol_id integer NOT NULL
);


ALTER TABLE public.rol_user OWNER TO testpsql_user;

--
-- Name: rol_user_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.rol_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rol_user_id_seq OWNER TO testpsql_user;

--
-- Name: rol_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.rol_user_id_seq OWNED BY public.rol_user.id;


--
-- Name: sucursal; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.sucursal (
    id integer NOT NULL,
    name character varying NOT NULL,
    company_id integer NOT NULL,
    address_id integer NOT NULL
);


ALTER TABLE public.sucursal OWNER TO testpsql_user;

--
-- Name: sucursal_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.sucursal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sucursal_id_seq OWNER TO testpsql_user;

--
-- Name: sucursal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.sucursal_id_seq OWNED BY public.sucursal.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.users (
    id integer NOT NULL,
    run character varying NOT NULL,
    status character varying NOT NULL,
    name character varying NOT NULL,
    first_lastname character varying NOT NULL,
    second_lastname character varying NOT NULL,
    birthdate date NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    address_id integer NOT NULL,
    sucursal_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO testpsql_user;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO testpsql_user;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: address id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.address ALTER COLUMN id SET DEFAULT nextval('public.address_id_seq'::regclass);


--
-- Name: allow id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.allow ALTER COLUMN id SET DEFAULT nextval('public.allow_id_seq'::regclass);


--
-- Name: allow_rol id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.allow_rol ALTER COLUMN id SET DEFAULT nextval('public.allow_rol_id_seq'::regclass);


--
-- Name: city id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.city ALTER COLUMN id SET DEFAULT nextval('public.city_id_seq'::regclass);


--
-- Name: company id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.company ALTER COLUMN id SET DEFAULT nextval('public.company_id_seq'::regclass);


--
-- Name: country id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.country ALTER COLUMN id SET DEFAULT nextval('public.country_id_seq'::regclass);


--
-- Name: region id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.region ALTER COLUMN id SET DEFAULT nextval('public.region_id_seq'::regclass);


--
-- Name: rol id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.rol ALTER COLUMN id SET DEFAULT nextval('public.rol_id_seq'::regclass);


--
-- Name: rol_user id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.rol_user ALTER COLUMN id SET DEFAULT nextval('public.rol_user_id_seq'::regclass);


--
-- Name: sucursal id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal ALTER COLUMN id SET DEFAULT nextval('public.sucursal_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: address; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.address (id, country_id, region_id, city_id, street_avenue, number) FROM stdin;
\.


--
-- Data for Name: allow; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.allow (id, name, description) FROM stdin;
1	user_Create	Permiso de creación
2	user_Read	Permiso de lectura
3	user_Update	Permiso de actualización
4	user_Delete	Permiso de eliminación
5	content_Create	Permiso de creación
6	content_Read	Permiso de lectura
7	content_Update	Permiso de actualización
8	content_Delete	Permiso de eliminación
\.


--
-- Data for Name: allow_rol; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.allow_rol (id, allow_id, rol_id) FROM stdin;
1	1	1
2	2	1
3	3	1
4	5	1
5	6	1
6	7	1
7	5	2
8	6	2
9	7	2
10	1	3
11	2	3
12	3	3
13	5	3
14	6	3
15	7	3
16	5	4
17	6	4
18	7	4
19	5	5
20	6	5
21	7	5
\.


--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.city (id, name, region_id) FROM stdin;
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.company (id, rut, status, oficial_name, commercial_name, address_id) FROM stdin;
\.


--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.country (id, name) FROM stdin;
1	Chile
\.


--
-- Data for Name: region; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.region (id, name, country_id) FROM stdin;
1	de Arica y Parinacota	1
2	de Tarapacá	1
3	de Antofagasta	1
4	de Atacama	1
5	de Coquimbo	1
6	de Valparaíso	1
7	Metropolitana de Santiago	1
8	del Libertador General Bernardo O"Higgins	1
9	del Maule	1
10	de Ñuble	1
11	del Biobío	1
12	de La Araucanía	1
13	de Los Ríos	1
14	de Los Lagos	1
15	de Aysén del General Carlos Ibáñez del Campo	1
16	de Magallanes y de la Antártica Chilena	1
\.


--
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.rol (id, name, description) FROM stdin;
1	Administrador	Rol de administrador
2	Investigador	Rol de investigador
3	Admin_Academico	Rol de académico
4	Docente	Rol de docente
5	Estudiante	Rol de estudiante
\.


--
-- Data for Name: rol_user; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.rol_user (id, user_id, rol_id) FROM stdin;
\.


--
-- Data for Name: sucursal; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.sucursal (id, name, company_id, address_id) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.users (id, run, status, name, first_lastname, second_lastname, birthdate, email, password, address_id, sucursal_id) FROM stdin;
\.


--
-- Name: address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.address_id_seq', 1, false);


--
-- Name: allow_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.allow_id_seq', 8, true);


--
-- Name: allow_rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.allow_rol_id_seq', 21, true);


--
-- Name: city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.city_id_seq', 1, false);


--
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.company_id_seq', 1, false);


--
-- Name: country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.country_id_seq', 1, true);


--
-- Name: region_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.region_id_seq', 16, true);


--
-- Name: rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.rol_id_seq', 5, true);


--
-- Name: rol_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.rol_user_id_seq', 1, false);


--
-- Name: sucursal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.sucursal_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: address address_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_pkey PRIMARY KEY (id);


--
-- Name: allow allow_name_key; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.allow
    ADD CONSTRAINT allow_name_key UNIQUE (name);


--
-- Name: allow allow_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.allow
    ADD CONSTRAINT allow_pkey PRIMARY KEY (id);


--
-- Name: allow_rol allow_rol_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.allow_rol
    ADD CONSTRAINT allow_rol_pkey PRIMARY KEY (id);


--
-- Name: city city_name_key; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_name_key UNIQUE (name);


--
-- Name: city city_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_pkey PRIMARY KEY (id);


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: country country_name_key; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_name_key UNIQUE (name);


--
-- Name: country country_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);


--
-- Name: region region_name_key; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.region
    ADD CONSTRAINT region_name_key UNIQUE (name);


--
-- Name: region region_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.region
    ADD CONSTRAINT region_pkey PRIMARY KEY (id);


--
-- Name: rol rol_name_key; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_name_key UNIQUE (name);


--
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id);


--
-- Name: rol_user rol_user_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.rol_user
    ADD CONSTRAINT rol_user_pkey PRIMARY KEY (id);


--
-- Name: sucursal sucursal_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal
    ADD CONSTRAINT sucursal_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: user_email_index; Type: INDEX; Schema: public; Owner: testpsql_user
--

CREATE UNIQUE INDEX user_email_index ON public.users USING btree (email);


--
-- Name: address address_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.city(id);


--
-- Name: address address_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.country(id);


--
-- Name: address address_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.address
    ADD CONSTRAINT address_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.region(id);


--
-- Name: allow_rol allow_rol_allow_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.allow_rol
    ADD CONSTRAINT allow_rol_allow_id_fkey FOREIGN KEY (allow_id) REFERENCES public.allow(id);


--
-- Name: allow_rol allow_rol_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.allow_rol
    ADD CONSTRAINT allow_rol_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.rol(id);


--
-- Name: city city_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.city
    ADD CONSTRAINT city_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.region(id);


--
-- Name: company company_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.address(id);


--
-- Name: region region_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.region
    ADD CONSTRAINT region_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.country(id);


--
-- Name: rol_user rol_user_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.rol_user
    ADD CONSTRAINT rol_user_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.rol(id);


--
-- Name: rol_user rol_user_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.rol_user
    ADD CONSTRAINT rol_user_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sucursal sucursal_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal
    ADD CONSTRAINT sucursal_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.address(id);


--
-- Name: sucursal sucursal_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal
    ADD CONSTRAINT sucursal_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: users users_address_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_address_id_fkey FOREIGN KEY (address_id) REFERENCES public.address(id);


--
-- Name: users users_sucursal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursal(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: testpsql_user
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO testpsql_user;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

