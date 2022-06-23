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
-- Name: allow; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.allow (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
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
    rol_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
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
    region_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
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
    rut integer NOT NULL,
    verify_code character varying NOT NULL,
    status character varying NOT NULL,
    company_type character varying NOT NULL,
    oficial_name character varying NOT NULL,
    commercial_name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.company OWNER TO testpsql_user;

--
-- Name: company_address; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.company_address (
    id integer NOT NULL,
    country_id integer NOT NULL,
    region_id integer NOT NULL,
    city_id integer NOT NULL,
    company_id integer NOT NULL,
    street_avenue character varying NOT NULL,
    number integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.company_address OWNER TO testpsql_user;

--
-- Name: company_address_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.company_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.company_address_id_seq OWNER TO testpsql_user;

--
-- Name: company_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.company_address_id_seq OWNED BY public.company_address.id;


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
    name character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
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
    country_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
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
    description character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
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
    users_id integer NOT NULL,
    rol_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
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
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.sucursal OWNER TO testpsql_user;

--
-- Name: sucursal_address; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.sucursal_address (
    id integer NOT NULL,
    country_id integer NOT NULL,
    region_id integer NOT NULL,
    city_id integer NOT NULL,
    sucursal_id integer NOT NULL,
    street_avenue character varying NOT NULL,
    number integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.sucursal_address OWNER TO testpsql_user;

--
-- Name: sucursal_address_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.sucursal_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sucursal_address_id_seq OWNER TO testpsql_user;

--
-- Name: sucursal_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.sucursal_address_id_seq OWNED BY public.sucursal_address.id;


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
    run integer NOT NULL,
    verify_code character varying NOT NULL,
    status character varying NOT NULL,
    name character varying NOT NULL,
    first_lastname character varying NOT NULL,
    second_lastname character varying NOT NULL,
    birthdate date NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    sucursal_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.users OWNER TO testpsql_user;

--
-- Name: users_address; Type: TABLE; Schema: public; Owner: testpsql_user
--

CREATE TABLE public.users_address (
    id integer NOT NULL,
    country_id integer NOT NULL,
    region_id integer NOT NULL,
    city_id integer NOT NULL,
    users_id integer NOT NULL,
    street_avenue character varying NOT NULL,
    number integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at date DEFAULT CURRENT_DATE
);


ALTER TABLE public.users_address OWNER TO testpsql_user;

--
-- Name: users_address_id_seq; Type: SEQUENCE; Schema: public; Owner: testpsql_user
--

CREATE SEQUENCE public.users_address_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_address_id_seq OWNER TO testpsql_user;

--
-- Name: users_address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: testpsql_user
--

ALTER SEQUENCE public.users_address_id_seq OWNED BY public.users_address.id;


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
-- Name: company_address id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.company_address ALTER COLUMN id SET DEFAULT nextval('public.company_address_id_seq'::regclass);


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
-- Name: sucursal_address id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal_address ALTER COLUMN id SET DEFAULT nextval('public.sucursal_address_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_address id; Type: DEFAULT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users_address ALTER COLUMN id SET DEFAULT nextval('public.users_address_id_seq'::regclass);


--
-- Data for Name: allow; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.allow (id, name, description, created_at, updated_at) FROM stdin;
1	user_Create	Permiso de creación	2022-06-23 02:34:18.022474	2022-06-23
2	user_Read	Permiso de lectura	2022-06-23 02:34:18.037209	2022-06-23
3	user_Update	Permiso de actualización	2022-06-23 02:34:18.048397	2022-06-23
4	user_Delete	Permiso de eliminación	2022-06-23 02:34:18.063605	2022-06-23
5	content_Create	Permiso de creación	2022-06-23 02:34:18.0788	2022-06-23
6	content_Read	Permiso de lectura	2022-06-23 02:34:18.109966	2022-06-23
7	content_Update	Permiso de actualización	2022-06-23 02:34:18.125021	2022-06-23
8	content_Delete	Permiso de eliminación	2022-06-23 02:34:18.155961	2022-06-23
\.


--
-- Data for Name: allow_rol; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.allow_rol (id, allow_id, rol_id, created_at, updated_at) FROM stdin;
1	1	1	2022-06-23 02:34:18.299252	2022-06-23
2	2	1	2022-06-23 02:34:18.306194	2022-06-23
3	3	1	2022-06-23 02:34:18.329701	2022-06-23
4	5	1	2022-06-23 02:34:18.332306	2022-06-23
5	6	1	2022-06-23 02:34:18.340979	2022-06-23
6	7	1	2022-06-23 02:34:18.34555	2022-06-23
7	5	2	2022-06-23 02:34:18.371265	2022-06-23
8	6	2	2022-06-23 02:34:18.387444	2022-06-23
9	7	2	2022-06-23 02:34:18.403626	2022-06-23
10	1	3	2022-06-23 02:34:18.418806	2022-06-23
11	2	3	2022-06-23 02:34:18.433939	2022-06-23
12	3	3	2022-06-23 02:34:18.438641	2022-06-23
13	5	3	2022-06-23 02:34:18.444897	2022-06-23
14	6	3	2022-06-23 02:34:18.448982	2022-06-23
15	7	3	2022-06-23 02:34:18.465443	2022-06-23
16	5	4	2022-06-23 02:34:18.46996	2022-06-23
17	6	4	2022-06-23 02:34:18.48043	2022-06-23
18	7	4	2022-06-23 02:34:18.495917	2022-06-23
19	5	5	2022-06-23 02:34:18.511892	2022-06-23
20	6	5	2022-06-23 02:34:18.527125	2022-06-23
21	7	5	2022-06-23 02:34:18.542782	2022-06-23
\.


--
-- Data for Name: city; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.city (id, name, region_id, created_at, updated_at) FROM stdin;
1	Santiago centro	7	2022-06-23 02:34:18.759672	2022-06-23
2	Vina del mar	6	2022-06-23 02:34:18.764162	2022-06-23
3	Concepcion	11	2022-06-23 02:34:18.775366	2022-06-23
\.


--
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.company (id, rut, verify_code, status, company_type, oficial_name, commercial_name, created_at, updated_at) FROM stdin;
1	71540100	2	active	Universidad	Andres Bello	UNAB	2022-06-23 02:39:50.335396	2022-06-23
\.


--
-- Data for Name: company_address; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.company_address (id, country_id, region_id, city_id, company_id, street_avenue, number, created_at, updated_at) FROM stdin;
1	1	7	1	1	Republica	239	2022-06-23 02:39:50.55078	2022-06-23
\.


--
-- Data for Name: country; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.country (id, name, created_at, updated_at) FROM stdin;
1	Chile	2022-06-23 02:34:18.558266	2022-06-23
\.


--
-- Data for Name: region; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.region (id, name, country_id, created_at, updated_at) FROM stdin;
1	Arica y Parinacota	1	2022-06-23 02:34:18.594034	2022-06-23
2	Tarapacá	1	2022-06-23 02:34:18.596596	2022-06-23
3	Antofagasta	1	2022-06-23 02:34:18.605433	2022-06-23
4	Atacama	1	2022-06-23 02:34:18.621089	2022-06-23
5	Coquimbo	1	2022-06-23 02:34:18.625404	2022-06-23
6	Valparaíso	1	2022-06-23 02:34:18.64016	2022-06-23
7	Metropolitana de Santiago	1	2022-06-23 02:34:18.65226	2022-06-23
8	Libertador General Bernardo O"Higgins	1	2022-06-23 02:34:18.670289	2022-06-23
9	Maule	1	2022-06-23 02:34:18.675629	2022-06-23
10	Ñuble	1	2022-06-23 02:34:18.678278	2022-06-23
11	Biobío	1	2022-06-23 02:34:18.683195	2022-06-23
12	La Araucanía	1	2022-06-23 02:34:18.688703	2022-06-23
13	Los Ríos	1	2022-06-23 02:34:18.697819	2022-06-23
14	Los Lagos	1	2022-06-23 02:34:18.713767	2022-06-23
15	Aysén del General Carlos Ibáñez del Campo	1	2022-06-23 02:34:18.729784	2022-06-23
16	Magallanes y de la Antártica Chilena	1	2022-06-23 02:34:18.733306	2022-06-23
\.


--
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.rol (id, name, description, created_at, updated_at) FROM stdin;
1	Administrador	Rol de administrador	2022-06-23 02:34:18.185687	2022-06-23
2	Investigador	Rol de investigador	2022-06-23 02:34:18.216867	2022-06-23
3	Admin_Academico	Rol de académico	2022-06-23 02:34:18.232676	2022-06-23
4	Docente	Rol de docente	2022-06-23 02:34:18.264266	2022-06-23
5	Estudiante	Rol de estudiante	2022-06-23 02:34:18.295078	2022-06-23
\.


--
-- Data for Name: rol_user; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.rol_user (id, users_id, rol_id, created_at, updated_at) FROM stdin;
1	1	5	2022-06-23 02:40:34.881664	2022-06-23
2	2	4	2022-06-23 02:40:37.275309	2022-06-23
\.


--
-- Data for Name: sucursal; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.sucursal (id, name, company_id, created_at, updated_at) FROM stdin;
1	Vina del mar	1	2022-06-23 02:39:50.367575	2022-06-23
2	Concepcion	1	2022-06-23 02:39:50.39563	2022-06-23
\.


--
-- Data for Name: sucursal_address; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.sucursal_address (id, country_id, region_id, city_id, sucursal_id, street_avenue, number, created_at, updated_at) FROM stdin;
1	1	6	2	1	Quillota	980	2022-06-23 02:39:50.581906	2022-06-23
2	1	11	3	2	Talcahuano	7100	2022-06-23 02:39:50.611765	2022-06-23
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.users (id, run, verify_code, status, name, first_lastname, second_lastname, birthdate, email, password, sucursal_id, created_at, updated_at) FROM stdin;
1	11111111	1	Mario	active	Flores	Cruz	1992-01-14	m.florescruz@uandresbello.edu	TODO	1	2022-06-23 02:39:50.472813	2022-06-23
2	22222222	2	Sergio	active	Rivera	Olivares	1965-01-01	sergio.rivera@unab.cl	TODO	2	2022-06-23 02:39:50.520023	2022-06-23
\.


--
-- Data for Name: users_address; Type: TABLE DATA; Schema: public; Owner: testpsql_user
--

COPY public.users_address (id, country_id, region_id, city_id, users_id, street_avenue, number, created_at, updated_at) FROM stdin;
1	1	6	2	1	Alvarez	58	2022-06-23 02:40:13.665249	2022-06-23
2	1	11	3	2	sin nombre	555	2022-06-23 02:40:25.401978	2022-06-23
\.


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

SELECT pg_catalog.setval('public.city_id_seq', 3, true);


--
-- Name: company_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.company_address_id_seq', 1, true);


--
-- Name: company_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.company_id_seq', 1, true);


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

SELECT pg_catalog.setval('public.rol_user_id_seq', 2, true);


--
-- Name: sucursal_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.sucursal_address_id_seq', 2, true);


--
-- Name: sucursal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.sucursal_id_seq', 2, true);


--
-- Name: users_address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.users_address_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: testpsql_user
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


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
-- Name: company_address company_address_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.company_address
    ADD CONSTRAINT company_address_pkey PRIMARY KEY (id);


--
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY (id);


--
-- Name: company company_rut_key; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_rut_key UNIQUE (rut);


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
-- Name: sucursal_address sucursal_address_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal_address
    ADD CONSTRAINT sucursal_address_pkey PRIMARY KEY (id);


--
-- Name: sucursal sucursal_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal
    ADD CONSTRAINT sucursal_pkey PRIMARY KEY (id);


--
-- Name: users_address users_address_pkey; Type: CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users_address
    ADD CONSTRAINT users_address_pkey PRIMARY KEY (id);


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
-- Name: company_address company_address_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.company_address
    ADD CONSTRAINT company_address_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.city(id);


--
-- Name: company_address company_address_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.company_address
    ADD CONSTRAINT company_address_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: company_address company_address_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.company_address
    ADD CONSTRAINT company_address_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.country(id);


--
-- Name: company_address company_address_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.company_address
    ADD CONSTRAINT company_address_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.region(id);


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
-- Name: rol_user rol_user_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.rol_user
    ADD CONSTRAINT rol_user_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


--
-- Name: sucursal_address sucursal_address_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal_address
    ADD CONSTRAINT sucursal_address_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.city(id);


--
-- Name: sucursal_address sucursal_address_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal_address
    ADD CONSTRAINT sucursal_address_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.country(id);


--
-- Name: sucursal_address sucursal_address_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal_address
    ADD CONSTRAINT sucursal_address_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.region(id);


--
-- Name: sucursal_address sucursal_address_sucursal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal_address
    ADD CONSTRAINT sucursal_address_sucursal_id_fkey FOREIGN KEY (sucursal_id) REFERENCES public.sucursal(id);


--
-- Name: sucursal sucursal_company_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.sucursal
    ADD CONSTRAINT sucursal_company_id_fkey FOREIGN KEY (company_id) REFERENCES public.company(id);


--
-- Name: users_address users_address_city_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users_address
    ADD CONSTRAINT users_address_city_id_fkey FOREIGN KEY (city_id) REFERENCES public.city(id);


--
-- Name: users_address users_address_country_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users_address
    ADD CONSTRAINT users_address_country_id_fkey FOREIGN KEY (country_id) REFERENCES public.country(id);


--
-- Name: users_address users_address_region_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users_address
    ADD CONSTRAINT users_address_region_id_fkey FOREIGN KEY (region_id) REFERENCES public.region(id);


--
-- Name: users_address users_address_users_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: testpsql_user
--

ALTER TABLE ONLY public.users_address
    ADD CONSTRAINT users_address_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id);


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

