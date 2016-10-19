--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.4
-- Dumped by pg_dump version 9.5.3

-- Started on 2016-10-18 11:19:12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET search_path = public, pg_catalog;

--
-- TOC entry 374 (class 1255 OID 1783671)
-- Name: get_xmlbinary(); Type: FUNCTION; Schema: public
--

CREATE FUNCTION get_xmlbinary() RETURNS character varying
    LANGUAGE plpgsql
    AS $$
                    DECLARE
                      xmlbin varchar;
                    BEGIN
                      select into xmlbin setting from pg_settings where name='xmlbinary';
                      RETURN xmlbin;
                    END;
                 $$;




SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 303 (class 1259 OID 1783681)
-- Name: degree_program_area; Type: TABLE; Schema: public
--

CREATE TABLE degree_program_area (
    degree_program_area_id integer NOT NULL,
    degree_id integer NOT NULL,
    program_area_id integer NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);




--
-- TOC entry 304 (class 1259 OID 1783685)
-- Name: degree_program_areas_degree_program_area_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE degree_program_areas_degree_program_area_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 304
-- Name: degree_program_areas_degree_program_area_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE degree_program_areas_degree_program_area_id_seq OWNED BY degree_program_area.degree_program_area_id;


--
-- TOC entry 305 (class 1259 OID 1783687)
-- Name: degrees; Type: TABLE; Schema: public
--

CREATE TABLE degrees (
    degree_id integer NOT NULL,
    degree character varying(50) NOT NULL,
    degree_code character varying(10) NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);




--
-- TOC entry 306 (class 1259 OID 1783691)
-- Name: degrees_degree_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE degrees_degree_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 306
-- Name: degrees_degree_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE degrees_degree_id_seq OWNED BY degrees.degree_id;


--
-- TOC entry 307 (class 1259 OID 1783693)
-- Name: mentors; Type: TABLE; Schema: public
--

CREATE TABLE mentors (
    mentor_id integer NOT NULL,
    user_id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    middle_name character varying(50),
    gender character varying(10),
    birthdate character varying(50)
);




--
-- TOC entry 308 (class 1259 OID 1783696)
-- Name: mentors_mentor_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE mentors_mentor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 308
-- Name: mentors_mentor_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE mentors_mentor_id_seq OWNED BY mentors.mentor_id;


--
-- TOC entry 309 (class 1259 OID 1783698)
-- Name: papers; Type: TABLE; Schema: public
--

CREATE TABLE papers (
    paper_id integer NOT NULL,
    program_id integer NOT NULL,
    paper character varying(100) NOT NULL,
    paper_code character varying(20) NOT NULL,
    paper_cost double precision NOT NULL,
    mentor_id integer NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);




--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 309
-- Name: COLUMN papers.mentor_id; Type: COMMENT; Schema: public
--

COMMENT ON COLUMN papers.mentor_id IS 'user_id of mentor';


--
-- TOC entry 310 (class 1259 OID 1783702)
-- Name: papers_paper_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE papers_paper_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 310
-- Name: papers_paper_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE papers_paper_id_seq OWNED BY papers.paper_id;


--
-- TOC entry 311 (class 1259 OID 1783704)
-- Name: program_areas; Type: TABLE; Schema: public
--

CREATE TABLE program_areas (
    program_area_id integer NOT NULL,
    program_area character varying(100) NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);




--
-- TOC entry 312 (class 1259 OID 1783708)
-- Name: program_areas_program_area_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE program_areas_program_area_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 312
-- Name: program_areas_program_area_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE program_areas_program_area_id_seq OWNED BY program_areas.program_area_id;


--
-- TOC entry 313 (class 1259 OID 1783710)
-- Name: programs; Type: TABLE; Schema: public
--

CREATE TABLE programs (
    program_id integer NOT NULL,
    degree_program_area_id integer NOT NULL,
    program character varying(100) NOT NULL,
    program_code character varying(10) NOT NULL,
    paper_count integer DEFAULT 3 NOT NULL,
    duration integer DEFAULT 3 NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);




--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 313
-- Name: COLUMN programs.paper_count; Type: COMMENT; Schema: public
--

COMMENT ON COLUMN programs.paper_count IS 'Number of papers to choose for an year';


--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 313
-- Name: COLUMN programs.duration; Type: COMMENT; Schema: public
--

COMMENT ON COLUMN programs.duration IS 'Total number of years';


--
-- TOC entry 314 (class 1259 OID 1783716)
-- Name: programs_program_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE programs_program_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 314
-- Name: programs_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE programs_program_id_seq OWNED BY programs.program_id;


--
-- TOC entry 315 (class 1259 OID 1783718)
-- Name: roles; Type: TABLE; Schema: public
--

CREATE TABLE roles (
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);




--
-- TOC entry 316 (class 1259 OID 1783722)
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE roles_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 316
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE roles_role_id_seq OWNED BY roles.role_id;


--
-- TOC entry 317 (class 1259 OID 1783724)
-- Name: sessions; Type: TABLE; Schema: public
--

CREATE TABLE sessions (
    session_id integer NOT NULL,
    session character varying(100) NOT NULL,
    paper_id integer NOT NULL,
    mentor_id integer NOT NULL,
    session_date date NOT NULL,
    has_completed boolean DEFAULT false NOT NULL,
    is_active boolean DEFAULT true NOT NULL,
    join_url character varying(200)
);




--
-- TOC entry 318 (class 1259 OID 1783729)
-- Name: sessions_session_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE sessions_session_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 318
-- Name: sessions_session_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE sessions_session_id_seq OWNED BY sessions.session_id;


--
-- TOC entry 319 (class 1259 OID 1783731)
-- Name: student_details; Type: TABLE; Schema: public
--

CREATE TABLE student_details (
    student_detail_id integer NOT NULL,
    student_id integer NOT NULL,
    paper_id integer NOT NULL,
    mentor_id integer NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);




--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 319
-- Name: COLUMN student_details.student_id; Type: COMMENT; Schema: public
--

COMMENT ON COLUMN student_details.student_id IS 'Student''s user_id';


--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 319
-- Name: COLUMN student_details.mentor_id; Type: COMMENT; Schema: public
--

COMMENT ON COLUMN student_details.mentor_id IS 'Mentor''s user_id';


--
-- TOC entry 320 (class 1259 OID 1783735)
-- Name: student_details_student_detail_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE student_details_student_detail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 320
-- Name: student_details_student_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE student_details_student_detail_id_seq OWNED BY student_details.student_detail_id;


--
-- TOC entry 321 (class 1259 OID 1783737)
-- Name: user_logins; Type: TABLE; Schema: public
--

CREATE TABLE user_logins (
    user_login_id integer NOT NULL,
    user_id integer NOT NULL,
    login_time character varying(100) NOT NULL,
    is_current boolean DEFAULT true NOT NULL
);




--
-- TOC entry 322 (class 1259 OID 1783741)
-- Name: user_logins_user_login_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE user_logins_user_login_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 322
-- Name: user_logins_user_login_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE user_logins_user_login_id_seq OWNED BY user_logins.user_login_id;


--
-- TOC entry 323 (class 1259 OID 1783743)
-- Name: user_passwords_user_passsword_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE user_passwords_user_passsword_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 324 (class 1259 OID 1783745)
-- Name: user_passwords; Type: TABLE; Schema: public
--

CREATE TABLE user_passwords (
    user_password_id integer DEFAULT nextval('user_passwords_user_passsword_id_seq'::regclass) NOT NULL,
    user_id integer NOT NULL,
    hashed_password character varying(100) NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);




--
-- TOC entry 325 (class 1259 OID 1783750)
-- Name: users; Type: TABLE; Schema: public
--

CREATE TABLE users (
    user_id integer NOT NULL,
    unique_id character varying(25) NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    role_id integer NOT NULL,
    password_salt character varying(100),
    is_active boolean DEFAULT true NOT NULL
);




--
-- TOC entry 326 (class 1259 OID 1783754)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public
--

CREATE SEQUENCE users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 326
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public
--

ALTER SEQUENCE users_user_id_seq OWNED BY users.user_id;


--
-- TOC entry 3217 (class 2604 OID 1783824)
-- Name: degree_program_area_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY degree_program_area ALTER COLUMN degree_program_area_id SET DEFAULT nextval('degree_program_areas_degree_program_area_id_seq'::regclass);


--
-- TOC entry 3219 (class 2604 OID 1783825)
-- Name: degree_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY degrees ALTER COLUMN degree_id SET DEFAULT nextval('degrees_degree_id_seq'::regclass);


--
-- TOC entry 3220 (class 2604 OID 1783826)
-- Name: mentor_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY mentors ALTER COLUMN mentor_id SET DEFAULT nextval('mentors_mentor_id_seq'::regclass);


--
-- TOC entry 3222 (class 2604 OID 1783827)
-- Name: paper_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY papers ALTER COLUMN paper_id SET DEFAULT nextval('papers_paper_id_seq'::regclass);


--
-- TOC entry 3224 (class 2604 OID 1783828)
-- Name: program_area_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY program_areas ALTER COLUMN program_area_id SET DEFAULT nextval('program_areas_program_area_id_seq'::regclass);


--
-- TOC entry 3228 (class 2604 OID 1783829)
-- Name: program_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY programs ALTER COLUMN program_id SET DEFAULT nextval('programs_program_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 1783830)
-- Name: role_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY roles ALTER COLUMN role_id SET DEFAULT nextval('roles_role_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 1783831)
-- Name: session_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY sessions ALTER COLUMN session_id SET DEFAULT nextval('sessions_session_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 1783832)
-- Name: student_detail_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY student_details ALTER COLUMN student_detail_id SET DEFAULT nextval('student_details_student_detail_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 1783833)
-- Name: user_login_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY user_logins ALTER COLUMN user_login_id SET DEFAULT nextval('user_logins_user_login_id_seq'::regclass);


--
-- TOC entry 3241 (class 2604 OID 1783834)
-- Name: user_id; Type: DEFAULT; Schema: public
--

ALTER TABLE ONLY users ALTER COLUMN user_id SET DEFAULT nextval('users_user_id_seq'::regclass);


--
-- TOC entry 3408 (class 0 OID 1783681)
-- Dependencies: 303
-- Data for Name: degree_program_area; Type: TABLE DATA; Schema: public
--

COPY degree_program_area (degree_program_area_id, degree_id, program_area_id, is_active) FROM stdin;
1	1	1	t
2	1	2	t
3	1	3	t
4	1	4	t
5	1	5	t
6	1	6	t
7	1	7	t
9	1	9	t
8	2	8	t
10	2	1	t
11	2	2	t
12	2	4	t
13	2	6	t
14	2	9	t
15	3	2	t
16	3	9	t
17	3	4	t
18	4	2	t
19	4	9	t
20	4	7	t
21	6	2	t
22	5	7	t
23	6	9	t
\.


--
-- TOC entry 3453 (class 0 OID 0)
-- Dependencies: 304
-- Name: degree_program_areas_degree_program_area_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('degree_program_areas_degree_program_area_id_seq', 23, true);


--
-- TOC entry 3410 (class 0 OID 1783687)
-- Dependencies: 305
-- Data for Name: degrees; Type: TABLE DATA; Schema: public
--

COPY degrees (degree_id, degree, degree_code, is_active) FROM stdin;
1	Undergraduate	UG	t
2	Postgraduate	PG	t
3	Undergraduate Certification	UGC	t
4	Postgraduate Certification	PGC	t
5	Doctoral	DR	t
6	Associates	ASS	t
\.


--
-- TOC entry 3454 (class 0 OID 0)
-- Dependencies: 306
-- Name: degrees_degree_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('degrees_degree_id_seq', 6, true);


--
-- TOC entry 3412 (class 0 OID 1783693)
-- Dependencies: 307
-- Data for Name: mentors; Type: TABLE DATA; Schema: public
--

COPY mentors (mentor_id, user_id, first_name, last_name, middle_name, gender, birthdate) FROM stdin;
3	278	Stewart	Graham	\N	\N	\N
4	279	Thomas	Henderson	\N	\N	\N
5	280	Una	Hart	\N	\N	\N
6	281	Carolyn	Campbell	\N	\N	\N
7	282	Rose	Mackay	\N	\N	\N
8	283	Stephanie	Roberts	\N	\N	\N
9	284	Piers	Nolan	\N	\N	\N
10	285	Olivia	Bond	\N	\N	\N
11	286	Joanne	Randall	\N	\N	\N
12	287	Carl	Jackson	\N	\N	\N
13	288	Ava	James	\N	\N	\N
14	289	Richard	Lewis	\N	\N	\N
15	290	Sean	Chapman	\N	\N	\N
16	291	Leonard	Wilson	\N	\N	\N
17	292	Dorothy	Burgess	\N	\N	\N
18	293	Irene	Lambert	\N	\N	\N
19	294	Una	Johnston	\N	\N	\N
20	295	Nicholas	Glover	\N	\N	\N
21	296	Hannah	Underwood	\N	\N	\N
22	297	Stephanie	Ball	\N	\N	\N
23	298	Eric	Ince	\N	\N	\N
24	299	Dorothy	Hudson	\N	\N	\N
25	300	Joseph	Hodges	\N	\N	\N
26	301	Elizabeth	Ball	\N	\N	\N
27	302	Sue	Terry	\N	\N	\N
28	303	Nicola	Bower	\N	\N	\N
29	304	Robert	Gray	\N	\N	\N
30	305	Christian	Bond	\N	\N	\N
31	306	Joan	North	\N	\N	\N
32	307	Wendy	Roberts	\N	\N	\N
33	308	Warren	Berry	\N	\N	\N
34	309	Joshua	Young	\N	\N	\N
35	310	Charles	Powell	\N	\N	\N
36	311	Katherine	Edmunds	\N	\N	\N
37	312	Amelia	Stewart	\N	\N	\N
38	313	Nicholas	King	\N	\N	\N
39	314	Kylie	Young	\N	\N	\N
40	315	Nicola	Young	\N	\N	\N
41	316	Harry	Lewis	\N	\N	\N
42	317	Brian	Roberts	\N	\N	\N
43	318	Edward	Walsh	\N	\N	\N
44	319	Deirdre	Sharp	\N	\N	\N
45	320	Richard	Dickens	\N	\N	\N
46	321	Simon	Butler	\N	\N	\N
47	322	Boris	Rampling	\N	\N	\N
48	323	Warren	Hudson	\N	\N	\N
49	324	Chloe	Watson	\N	\N	\N
50	325	Jessica	Robertson	\N	\N	\N
51	326	Sarah	Mackenzie	\N	\N	\N
52	327	Anna	Gill	\N	\N	\N
53	328	Claire	Rees	\N	\N	\N
54	329	Dan	Ross	\N	\N	\N
55	330	Michelle	Tucker	\N	\N	\N
56	331	Deirdre	Gill	\N	\N	\N
57	332	Chloe	Hunter	\N	\N	\N
58	333	Matt	Rutherford	\N	\N	\N
59	334	Alexandra	Slater	\N	\N	\N
60	335	Benjamin	Robertson	\N	\N	\N
61	336	Joanne	Grant	\N	\N	\N
62	337	Trevor	Dowd	\N	\N	\N
63	338	Anna	Paige	\N	\N	\N
64	339	Eric	McDonald	\N	\N	\N
65	340	Steven	Ross	\N	\N	\N
66	341	Carl	MacDonald	\N	\N	\N
67	342	Diana	Hamilton	\N	\N	\N
68	343	Isaac	Reid	\N	\N	\N
69	344	Harry	Johnston	\N	\N	\N
70	345	Colin	Simpson	\N	\N	\N
71	346	Brian	Welch	\N	\N	\N
72	347	Anna	Butler	\N	\N	\N
73	348	Andrea	Piper	\N	\N	\N
74	349	Gordon	Wallace	\N	\N	\N
75	350	Joseph	Randall	\N	\N	\N
76	351	Tracey	King	\N	\N	\N
77	352	Lauren	Bailey	\N	\N	\N
78	353	Sam	Duncan	\N	\N	\N
79	354	Wanda	Tucker	\N	\N	\N
80	355	Sue	Hill	\N	\N	\N
81	356	Elizabeth	Sharp	\N	\N	\N
82	357	Sean	Blake	\N	\N	\N
83	358	Alison	Walker	\N	\N	\N
84	359	Michelle	Glover	\N	\N	\N
85	360	Evan	Vance	\N	\N	\N
86	361	Michael	Metcalfe	\N	\N	\N
87	362	Lisa	Grant	\N	\N	\N
88	363	Sue	Paterson	\N	\N	\N
89	364	Gavin	Hart	\N	\N	\N
90	365	Anne	Fraser	\N	\N	\N
91	366	Kylie	Bond	\N	\N	\N
92	367	Karen	Marshall	\N	\N	\N
93	368	Steven	Campbell	\N	\N	\N
94	369	Cameron	Gibson	\N	\N	\N
95	370	Joseph	Clarkson	\N	\N	\N
96	371	Ryan	Bailey	\N	\N	\N
97	372	Sonia	Metcalfe	\N	\N	\N
98	373	Thomas	Piper	\N	\N	\N
99	374	Andrew	Jackson	\N	\N	\N
100	375	Isaac	Parsons	\N	\N	\N
101	376	Austin	Miller	\N	\N	\N
102	377	Ryan	Gill	\N	\N	\N
103	378	Alexandra	Fisher	\N	\N	\N
104	379	Gabrielle	Howard	\N	\N	\N
105	380	Lisa	James	\N	\N	\N
106	381	Wanda	Bell	\N	\N	\N
107	382	Audrey	MacLeod	\N	\N	\N
108	383	Alison	Abraham	\N	\N	\N
109	384	Max	Manning	\N	\N	\N
110	385	Richard	Pullman	\N	\N	\N
111	386	Ryan	Lambert	\N	\N	\N
112	387	Lisa	Campbell	\N	\N	\N
113	388	David	Scott	\N	\N	\N
114	389	Ava	Short	\N	\N	\N
115	390	Jason	Anderson	\N	\N	\N
116	391	Edward	Arnold	\N	\N	\N
117	392	Victoria	Young	\N	\N	\N
118	393	Deirdre	James	\N	\N	\N
119	394	Justin	Kelly	\N	\N	\N
120	395	Lily	Short	\N	\N	\N
121	396	Nathan	Greene	\N	\N	\N
122	397	Connor	Underwood	\N	\N	\N
123	398	Jason	Welch	\N	\N	\N
124	399	Robert	Berry	\N	\N	\N
125	400	Diana	James	\N	\N	\N
126	401	Theresa	Edmunds	\N	\N	\N
127	402	Christopher	Abraham	\N	\N	\N
128	403	Sebastian	Jones	\N	\N	\N
129	404	Katherine	Martin	\N	\N	\N
130	405	Heather	Buckland	\N	\N	\N
131	406	Madeleine	Harris	\N	\N	\N
132	407	Gabrielle	Parsons	\N	\N	\N
133	408	Isaac	Wilkins	\N	\N	\N
134	409	Lucas	Quinn	\N	\N	\N
135	410	Megan	Peake	\N	\N	\N
136	411	Sue	Watson	\N	\N	\N
137	412	Michelle	Parsons	\N	\N	\N
138	413	Katherine	Morrison	\N	\N	\N
139	414	Anthony	Miller	\N	\N	\N
140	415	Jason	Dickens	\N	\N	\N
141	416	Ella	Ellison	\N	\N	\N
142	417	Sarah	Nolan	\N	\N	\N
143	418	Chloe	Gibson	\N	\N	\N
144	419	Joshua	Walker	\N	\N	\N
145	420	Sam	Alsop	\N	\N	\N
146	421	Stewart	Lyman	\N	\N	\N
147	422	Boris	Butler	\N	\N	\N
148	423	Samantha	Dyer	\N	\N	\N
149	424	Dorothy	Miller	\N	\N	\N
150	425	Adrian	Fisher	\N	\N	\N
1	276	Gordon	Harris	\N	\N	\N
2	277	Isaac	Quinn	\N	\N	\N
\.


--
-- TOC entry 3455 (class 0 OID 0)
-- Dependencies: 308
-- Name: mentors_mentor_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('mentors_mentor_id_seq', 175, true);


--
-- TOC entry 3414 (class 0 OID 1783698)
-- Dependencies: 309
-- Data for Name: papers; Type: TABLE DATA; Schema: public
--

COPY papers (paper_id, program_id, paper, paper_code, paper_cost, mentor_id, is_active) FROM stdin;
83	13	Digital Humanities	MLIS_3	250	142	t
1	3	Economics	BA_1	200	110	t
2	3	Political Science	BA_2	200	144	t
199	35	Principles of Software Testing	ASSOCST_1	300	37	t
200	35	Software Testing and Test Design	ASSOCST_2	300	130	t
201	35	Evaluating Requirements & Requirement-Based Test Design	ASSOCST_3	300	49	t
202	35	Managing the Testing Process	ASSOCST_4	300	86	t
203	35	Requirement Definitions, Refinement and Verification	ASSOCST_5	300	20	t
204	36	Project Management Professional 	ASSOCSPM_1	1000	76	t
205	36	Certified Associate in Project Management 	ASSOCSPM_2	1000	37	t
206	36	Portfolio Management Professional	ASSOCSPM_3	1000	52	t
207	36	PMI Risk Management Professional 	ASSOCSPM_4	1000	56	t
208	36	Program Management Professional 	ASSOCSPM_5	1000	65	t
209	28	Contemporary Christian artist	PGCERTMUS_1	1000	118	t
210	28	Director of Worship and Drama	PGCERTMUS_2	1000	119	t
211	28	Director of worship technology	PGCERTMUS_3	1000	93	t
212	28	Minister of music	PGCERTMUS_4	1000	61	t
213	28	Music and worship evangelist	PGCERTMUS_5	1000	22	t
214	30	Welcome to the Middle Ages	PGCERTAGE_1	200	100	t
215	30	Christians in Late Antiquity	PGCERTAGE_2	200	68	t
216	30	Justinian and the Byzantine Empire  	PGCERTAGE_3	200	67	t
217	30	Britain	PGCERTAGE_4	200	104	t
218	30	The Carolingians  	PGCERTAGE_5	200	110	t
3	3	Psychology	BA_3	200	7	t
4	3	Sociology	BA_4	200	120	t
5	3	Ancient Indian Culture	BA_5	200	10	t
6	3	English	BA_6	200	70	t
7	3	Sociology	BA_7	200	44	t
8	3	Commerce	BA_8	200	62	t
9	3	History	BA_9	200	68	t
10	3	Statistics 	BA_10	200	127	t
11	3	Anthropology	BA_11	200	105	t
12	1	Business	BBA_1	200	2	t
13	1	Marketing	BBA_2	200	26	t
14	1	Business Management	BBA_3	200	87	t
15	1	International Business	BBA_4	200	79	t
16	1	International Business Management	BBA_5	200	17	t
17	1	Administration	BBA_6	200	121	t
18	1	Finance	BBA_7	200	40	t
19	1	Business Economics	BBA_8	200	116	t
20	1	Management Science	BBA_9	200	71	t
21	1	Tourism	BBA_10	200	6	t
23	2	Instrumental Performance	BMP_2	250	23	t
22	2	Composition	BMP_1	250	50	t
24	2	Music Education	BMP_3	250	26	t
25	2	Piano Performance	BMP_4	250	53	t
26	2	Vocal Performance	BMP_5	250	87	t
29	4	Criminal Justice	BCJS_1	250	5	t
30	4	Criminal Justice Administration	BCJS_2	250	42	t
31	4	Criminal Justice Leadership	BCJS_3	250	126	t
33	5	Political Science	BED_2	200	104	t
34	5	Psychology	BED_3	200	105	t
35	5	Sociology	BED_4	200	19	t
36	5	Ancient Indian Culture	BED_5	200	110	t
37	5	English	BED_6	200	94	t
38	5	Sociology	BED_7	200	29	t
40	5	History	BED_9	200	49	t
39	5	Commerce	BED_8	200	91	t
42	6	Complementary and Alternative Health	BHA_1	200	116	t
43	6	Gerontology	BHA_2	200	4	t
44	6	Health and Human Services	BHA_3	200	65	t
45	6	Health and Wellness	BHA_4	200	118	t
47	6	Health Education	BHA_6	200	22	t
48	6	Health Information Management	BHA_7	200	66	t
49	7	Human Development	BHS_1	200	46	t
50	7	Health and Human Services	BHS_2	200	13	t
51	7	Human Services	BHS_3	200	106	t
52	7	Psychology in Addictions	BHS_4	200	31	t
53	7	Family and Human Development	BHS_5	200	83	t
55	8	Developmental Psychology	BPSYCH_2	200	54	t
56	8	Educational Psychology	BPSYCH_3	200	3	t
57	8	General Psychology	BPSYCH_4	200	8	t
58	8	Industrial/Organizational Psychology	BPSYCH_5	200	107	t
60	9	Information Research Scientist	BTECH_2	250	90	t
61	9	Computer Systems Analyst	BTECH_3	250	18	t
62	9	Information Security Analyst	BTECH_4	250	85	t
64	10	Data Management	BIT_1	250	122	t
65	10	IT Entrepreneurship and Management	BIT_2	250	59	t
66	10	Networking and Communications	BIT_3	250	42	t
67	10	Software Development	BIT_4	250	102	t
68	10	System Administration	BIT_5	250	23	t
69	10	Systems Security	BIT_6	250	71	t
70	10	Web Design and Applications Development	BIT_7	250	21	t
71	11	Software Programmer	BCA_1	250	29	t
72	11	System and Network Administrator	BCA_2	250	31	t
73	11	Database Administrator	BCA_3	250	7	t
74	11	Web Designer	BCA_4	250	32	t
75	11	Web/Multimedia Programmer	BCA_5	250	96	t
76	12	Database Management Systems 	BSC_1	250	124	t
77	12	Operating Systems 	BSC_2	250	61	t
78	12	Design and Organization of Programming Languages	BSC_3	250	117	t
79	12	Algorithms and Data Structures	BSC_4	250	60	t
80	12	Organization of Computer Systems	BSC_5	250	106	t
82	13	Information Architecture	MLIS_2	250	36	t
84	13	Children’s and Young Adult Services	MLIS_4	250	82	t
85	13	Data Science	MLIS_5	250	17	t
54	8	Addiction Psychology	BPSYCH_1	250	1	t
63	9	Software Application Developer	BTECH_5	200	24	t
86	15	Business	MBA_1	400	60	t
87	15	Marketing	MBA_2	400	85	t
88	15	International Business	MBA_3	400	24	t
89	15	International Business	MBA_4	400	36	t
90	15	International Business Management	MBA_5	400	44	t
93	15	Business Economics	MBA_7	400	35	t
92	15	Administration	MBA_6	400	54	t
94	15	Tourism	MBA_8	400	129	t
95	16	Composition	MMPHIL_1	400	58	t
96	16	Instrumental Performance	MMPHIL_2	400	45	t
97	16	Keyboard Accompanying	MMPHIL_3	400	57	t
98	16	Music Education	MMPHIL_4	400	100	t
99	16	Piano Performance	MMPHIL_5	400	17	t
100	16	Vocal Performance	MMPHIL_6	400	80	t
101	17	Economics	MA_1	400	41	t
102	17	Political Science	MA_2	400	37	t
103	17	Psychology	MA_3	400	108	t
105	17	English	MA_5	400	43	t
106	17	Commerce	MA_6	400	10	t
107	17	History	MA_7	400	37	t
109	17	Statistics 	MA_8	400	37	t
110	17	Anthropology	MA_9	400	70	t
111	18	Economics	MED_1	400	23	t
112	18	Political Science	MED_2	400	96	t
113	18	Psychology	MED_3	400	46	t
114	18	Sociology	MED_4	400	22	t
115	18	English	MED_6	400	2	t
117	18	English	MED_5	400	52	t
41	5	Statistics 	BED_10	200	143	t
32	5	Economics	BED_1	200	148	t
46	6	Health Care Administration	BHA_5	200	149	t
81	13	Library Technology Management	MLIS_1	250	1	t
104	17	Sociology	MA_4	400	27	t
118	18	Statistics 	MED_7	400	104	t
119	18	Human Development	MED_8	400	18	t
120	18	Health and Human Services	MED_9	400	112	t
121	19	Complementary and Alternative Health	MHADM_1	400	58	t
122	19	Gerontology	MHADM_2	400	41	t
123	19	Health and Human Services	MHADM_3	400	17	t
124	19	Health and Wellness	MHADM_4	400	101	t
125	19	Health Care Administration	MHADM_5	400	76	t
127	19	Health Information Management	MHADM_7	400	99	t
129	20	Information Research Scientist	MTECH_2	500	116	t
131	20	Information Security Analyst	MTECH_4	500	26	t
132	20	Software Application Developer	MTECH_5	500	103	t
133	21	Data Management	MITECH_1	500	105	t
134	21	IT Entrepreneurship and Management	MITECH_2	500	14	t
135	21	Networking and Communications	MITECH_3	500	38	t
136	21	Software Development	MITECH_4	500	83	t
137	21	System Administration	MITECH_5	500	84	t
138	21	Systems Security	MITECH_6	500	81	t
139	21	Web Design and Applications Development	MITECH_7	500	93	t
141	22	System and Network Administrator	MCA_2	500	117	t
142	22	Database Administrator	MCA_3	500	32	t
143	22	Web Designer	MCA_4	500	13	t
144	22	Web/Multimedia Programmer	MCA_5	500	83	t
145	23	Database Management Systems 	MSCCOMP_1	500	78	t
146	23	Operating Systems 	MSCCOMP_2	500	34	t
147	23	Design and Organization of Programming Languages	MSCCOMP_3	500	84	t
148	23	Algorithms and Data Structures	MSCCOMP_4	500	129	t
151	24	Global Entertainment and Music Business	UGCERTMUS_2	500	110	t
152	24	Music Therapy	UGCERTMUS_3	500	65	t
153	24	Music in Scoring for Film, Television, and Video Games	UGCERTMUS_4	500	12	t
154	24	Business Administration in Music Business	UGCERTMUS_5	500	127	t
155	26	Computers and Information	UGCERTBCO_1	400	35	t
156	26	Introduction to Computer Science I	UGCERTBCO_2	400	87	t
157	26	Introduction to Computer Science II	UGCERTBCO_3	400	67	t
159	26	Organization of Computer Systems	UGCERTBCO_5	400	90	t
160	26	Introduction to Discrete Structures	UGCERTBCO_6	400	53	t
161	26	 Web Programming	UGCERTBCO_7	400	30	t
163	27	Evaluation and Assessment	UGCERTEDU_2	300	63	t
164	27	Curriculum and Content Standards	UGCERTEDU_3	300	5	t
165	27	U.S. Primary and Secondary Qualifications 	UGCERTEDU_4	300	76	t
166	27	U.S. Career and Technical Qualifications 	UGCERTEDU_5	300	92	t
168	29	Embedded Systems	PGCERTMIC_1	500	30	t
169	29	specializing in Linux and microcontrollers	PGCERTMIC_2	500	42	t
170	29	MICROPROCESSOR TECHNOLOGY & INSTRUMENTATION	PGCERTMIC_3	500	50	t
171	29	Microprocessor Systems and Interfacing	PGCERTMIC_4	500	20	t
172	29	Microprocessor Architecture And Systems	PGCERTMIC_5	500	28	t
174	25	Graphic Design	UGCERTCALL_2	200	32	t
176	25	Contemporary Calligraphic Practice	UGCERTCALL_3	200	110	t
177	25	Principal Tools for a Calligrapher	UGCERTCALL_4	200	29	t
178	25	Western calligraphy	UGCERTCALL_5	200	66	t
179	31	Renaissance art	ASSOCART_1	300	63	t
180	31	Modern British literature	ASSOCART_2	300	28	t
181	31	Shakespeare histories	ASSOCART_3	300	73	t
182	31	French film history and theory	ASSOCART_4	300	34	t
183	31	World economic studies	ASSOCART_5	300	8	t
184	32	Associate of Applied Science in Accounting 	ASSOCSCI_1	300	8	t
185	32	Associate of Applied Science in Fire Science 	ASSOCSCI_2	300	45	t
186	32	Associate of Applied Science in Business Administration 	ASSOCSCI_3	300	4	t
187	32	Associate of Applied Science in Nursing 	ASSOCSCI_4	300	42	t
188	32	Associate of Applied Science in Public Safety and Security	ASSOCSCI_5	300	2	t
190	33	Clinical Psychology	DRPSYCH_2	2000	46	t
191	33	Organizational Psychology	DRPSYCH_3	2000	92	t
192	33	Forensic Psychology	DRPSYCH_4	2000	123	t
193	33	Psychotherapy	DRPSYCH_5	2000	76	t
194	34	Introductory architectural sketching and modeling	ASSOCSA_1	1000	25	t
196	34	Designing spaces for offices and commercial buildings	ASSOCSA_3	1000	80	t
197	34	Computer-aided architectural drawing and 3-D modeling	ASSOCSA_4	1000	101	t
130	20	Computer Systems Analyst	MTECH_3	500	140	t
128	20	Computer Systems Manager	MTECH_1	500	141	t
198	34	Working with building materials	ASSOCSA_5	1000	146	t
149	23	Organization of Computer Systems	MSCCOMP_5	500	147	t
162	27	Progressing Through the System	UGCERTEDU_1	300	150	t
195	34	Hand sketching techniques and digital design concepts	ASSOCSA_2	1000	135	t
150	24	Music in Contemporary Performance	UGCERTMUS_1	500	138	t
126	19	Health Education	MHADM_6	400	39	t
167	27	Associate Degrees	UGCERTEDU_6	300	77	t
59	9	Computer Systems Manager	BTECH_1	300	12	t
158	26	Introduction to Geographic Information Systems	UGCERTBCO_4	450	4	t
231	22	RDBMS	MCA_6	230	128	t
140	22	Software Programmer	MCA_1	500	147	t
233	10	Information Technology	BIT_8	120	93	t
230	30	Age methodology	PGCERTAGE_6	80	122	t
232	25	Handling calligraphy tools	UGCERTCALL_6	120	133	t
173	25	Handwriting and Script typeface	UGCERTCALL_1	100	111	t
189	33	Applied Psychology	DRPSYCH_1	2000	13	t
234	28	Basics of music	PGCERTMUS_6	300	17	t
235	7	Fundamentals of Human Services	BHS_6	200	76	t
\.


--
-- TOC entry 3456 (class 0 OID 0)
-- Dependencies: 310
-- Name: papers_paper_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('papers_paper_id_seq', 235, true);


--
-- TOC entry 3416 (class 0 OID 1783704)
-- Dependencies: 311
-- Data for Name: program_areas; Type: TABLE DATA; Schema: public
--

COPY program_areas (program_area_id, program_area, is_active) FROM stdin;
1	Business & Management	t
2	Arts & Science	t
3	Criminal Justice & Security	t
4	Education	t
5	Health Adminstration	t
6	Human Services	t
7	Psychology	t
9	Technology	t
8	Library Management	t
\.


--
-- TOC entry 3457 (class 0 OID 0)
-- Dependencies: 312
-- Name: program_areas_program_area_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('program_areas_program_area_id_seq', 9, true);


--
-- TOC entry 3418 (class 0 OID 1783710)
-- Dependencies: 313
-- Data for Name: programs; Type: TABLE DATA; Schema: public
--

COPY programs (program_id, degree_program_area_id, program, program_code, paper_count, duration, is_active) FROM stdin;
1	1	Bachelor of Business Administration	BBA	3	3	t
2	2	Bachelor in Music Philosopy	BMP	3	3	t
3	2	Bachelor in arts	BA	3	3	t
4	3	Bachelor in Criminal Justice & Security	BCJS	3	3	t
5	4	Bachelor of Education	BED	3	3	t
6	5	Bachelor in Health Adminstration	BHA	3	3	t
7	6	Bachelor in Human Services	BHS	3	3	t
8	7	Bachelors in Psychology	BPSYCH	3	3	t
9	9	Bachelor of Technology	BTECH	3	3	t
10	9	Bachelor of Information Technology	BIT	3	3	t
11	9	Bachelor of Computer Applications	BCA	3	3	t
12	9	Bachelor of Computer Science	BSC	3	3	t
22	14	Master of Computer Applications	MCA	3	3	t
24	15	Music	UGCERTMUS	2	1	t
25	15	Calligraphy	UGCERTCALL	2	1	t
26	16	Basic Computer Operating	UGCERTBCO	2	1	t
27	17	Basics of Education	UGCERTEDU	2	1	t
29	19	Microprocessors	PGCERTMIC	2	1	t
30	20	Dealing with ages	PGCERTAGE	2	1	t
31	21	Associates in Arts	ASSOCART	2	1	t
32	21	Associates in Science	ASSOCSCI	2	1	t
34	23	Associate in Software Architecture	ASSOCSA	2	1	t
35	23	Associate in Software Testing	ASSOCST	2	1	t
36	23	Associate in Software Planning & Management	ASSOCSPM	2	1	t
28	18	Music Terminologies	PGCERTMUS	2	1	t
33	22	Doctorate in Psychology	DRPSYCH	3	5	t
13	8	Masters in Library Science	MLIS	3	2	t
15	10	Master of Business Administration	MBA	3	2	t
16	11	Masters in Music Philosopy	MMPHIL	3	2	t
17	11	Masters in arts	MA	3	2	t
18	12	Masters in Education	MED	3	2	t
19	13	Masters in Health Adminstration	MHADM	3	2	t
20	14	Master of Technology	MTECH	3	2	t
21	14	Master of Information Technology	MITECH	3	2	t
23	14	Master of Computer Science	MSCCOMP	3	2	t
\.


--
-- TOC entry 3458 (class 0 OID 0)
-- Dependencies: 314
-- Name: programs_program_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('programs_program_id_seq', 36, true);


--
-- TOC entry 3420 (class 0 OID 1783718)
-- Dependencies: 315
-- Data for Name: roles; Type: TABLE DATA; Schema: public
--

COPY roles (role_id, role_name, is_active) FROM stdin;
1	administrator	t
2	mentor	t
3	student	t
\.


--
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 316
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('roles_role_id_seq', 3, true);


--
-- TOC entry 3422 (class 0 OID 1783724)
-- Dependencies: 317
-- Data for Name: sessions; Type: TABLE DATA; Schema: public
--

COPY sessions (session_id, session, paper_id, mentor_id, session_date, has_completed, is_active, join_url) FROM stdin;
29	Fall 2016	33	104	2016-10-24	f	t	session.com
\.


--
-- TOC entry 3460 (class 0 OID 0)
-- Dependencies: 318
-- Name: sessions_session_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('sessions_session_id_seq', 29, true);


--
-- TOC entry 3424 (class 0 OID 1783731)
-- Dependencies: 319
-- Data for Name: student_details; Type: TABLE DATA; Schema: public
--

COPY student_details (student_detail_id, student_id, paper_id, mentor_id, is_active) FROM stdin;
\.


--
-- TOC entry 3461 (class 0 OID 0)
-- Dependencies: 320
-- Name: student_details_student_detail_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('student_details_student_detail_id_seq', 68, true);


--
-- TOC entry 3426 (class 0 OID 1783737)
-- Dependencies: 321
-- Data for Name: user_logins; Type: TABLE DATA; Schema: public
--

COPY user_logins (user_login_id, user_id, login_time, is_current) FROM stdin;
\.


--
-- TOC entry 3462 (class 0 OID 0)
-- Dependencies: 322
-- Name: user_logins_user_login_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('user_logins_user_login_id_seq', 1, false);


--
-- TOC entry 3429 (class 0 OID 1783745)
-- Dependencies: 324
-- Data for Name: user_passwords; Type: TABLE DATA; Schema: public
--

COPY user_passwords (user_password_id, user_id, hashed_password, is_active) FROM stdin;
20	276	GordonHa	t
21	277	IsaacQu	t
22	278	StewartGr	t
23	279	ThomasHe	t
24	280	UnaHa	t
25	281	CarolynCa	t
26	282	RoseMa	t
27	283	StephanieRo	t
28	284	PiersNo	t
29	285	OliviaBo	t
30	286	JoanneRa	t
31	287	CarlJa	t
32	288	AvaJa	t
33	289	RichardLe	t
34	290	SeanCh	t
35	291	LeonardWi	t
36	292	DorothyBu	t
37	293	IreneLa	t
38	294	UnaJo	t
39	295	NicholasGl	t
40	296	HannahUn	t
41	297	StephanieBa	t
42	298	EricIn	t
43	299	DorothyHu	t
44	300	JosephHo	t
45	301	ElizabethBa	t
46	302	SueTe	t
47	303	NicolaBo	t
48	304	RobertGr	t
49	305	ChristianBo	t
50	306	JoanNo	t
51	307	WendyRo	t
52	308	WarrenBe	t
53	309	JoshuaYo	t
54	310	CharlesPo	t
55	311	KatherineEd	t
56	312	AmeliaSt	t
57	313	NicholasKi	t
58	314	KylieYo	t
59	315	NicolaYo	t
60	316	HarryLe	t
61	317	BrianRo	t
62	318	EdwardWa	t
63	319	DeirdreSh	t
64	320	RichardDi	t
65	321	SimonBu	t
66	322	BorisRa	t
67	323	WarrenHu	t
68	324	ChloeWa	t
69	325	JessicaRo	t
70	326	SarahMa	t
71	327	AnnaGi	t
72	328	ClaireRe	t
73	329	DanRo	t
74	330	MichelleTu	t
75	331	DeirdreGi	t
76	332	ChloeHu	t
77	333	MattRu	t
78	334	AlexandraSl	t
79	335	BenjaminRo	t
80	336	JoanneGr	t
81	337	TrevorDo	t
82	338	AnnaPa	t
83	339	EricMc	t
84	340	StevenRo	t
85	341	CarlMa	t
86	342	DianaHa	t
87	343	IsaacRe	t
88	344	HarryJo	t
89	345	ColinSi	t
90	346	BrianWe	t
91	347	AnnaBu	t
92	348	AndreaPi	t
93	349	GordonWa	t
94	350	JosephRa	t
95	351	TraceyKi	t
96	352	LaurenBa	t
97	353	SamDu	t
98	354	WandaTu	t
99	355	SueHi	t
100	356	ElizabethSh	t
101	357	SeanBl	t
102	358	AlisonWa	t
103	359	MichelleGl	t
104	360	EvanVa	t
105	361	MichaelMe	t
106	362	LisaGr	t
107	363	SuePa	t
108	364	GavinHa	t
109	365	AnneFr	t
110	366	KylieBo	t
111	367	KarenMa	t
112	368	StevenCa	t
113	369	CameronGi	t
114	370	JosephCl	t
115	371	RyanBa	t
116	372	SoniaMe	t
117	373	ThomasPi	t
118	374	AndrewJa	t
119	375	IsaacPa	t
120	376	AustinMi	t
121	377	RyanGi	t
122	378	AlexandraFi	t
123	379	GabrielleHo	t
124	380	LisaJa	t
125	381	WandaBe	t
126	382	AudreyMa	t
127	383	AlisonAb	t
128	384	MaxMa	t
129	385	RichardPu	t
130	386	RyanLa	t
131	387	LisaCa	t
132	388	DavidSc	t
133	389	AvaSh	t
134	390	JasonAn	t
135	391	EdwardAr	t
136	392	VictoriaYo	t
137	393	DeirdreJa	t
138	394	JustinKe	t
139	395	LilySh	t
140	396	NathanGr	t
141	397	ConnorUn	t
142	398	JasonWe	t
143	399	RobertBe	t
144	400	DianaJa	t
145	401	TheresaEd	t
146	402	ChristopherAb	t
147	403	SebastianJo	t
148	404	KatherineMa	t
149	405	HeatherBu	t
1	1	admin	t
150	406	MadeleineHa	t
151	407	GabriellePa	t
152	408	IsaacWi	t
153	409	LucasQu	t
154	410	MeganPe	t
155	411	SueWa	t
156	412	MichellePa	t
157	413	KatherineMo	t
158	414	AnthonyMi	t
159	415	JasonDi	t
160	416	EllaEl	t
161	417	SarahNo	t
162	418	ChloeGi	t
163	419	JoshuaWa	t
164	420	SamAl	t
165	421	StewartLy	t
166	422	BorisBu	t
167	423	SamanthaDy	t
168	424	DorothyMi	t
169	425	AdrianFi	t
\.


--
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 323
-- Name: user_passwords_user_passsword_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('user_passwords_user_passsword_id_seq', 202, true);


--
-- TOC entry 3430 (class 0 OID 1783750)
-- Dependencies: 325
-- Data for Name: users; Type: TABLE DATA; Schema: public
--

COPY users (user_id, unique_id, username, email, role_id, password_salt, is_active) FROM stdin;
1	to_generate	admin	admin@mstonlineacademy.com	1	\N	t
276	to_generate_GordonHa	GordonHa	gordon.harris@mstonlineacademy.com	2	\N	t
277	to_generate_IsaacQu	IsaacQu	isaac.quinn@mstonlineacademy.com	2	\N	t
278	to_generate_StewartGr	StewartGr	stewart.graham@mstonlineacademy.com	2	\N	t
279	to_generate_ThomasHe	ThomasHe	thomas.henderson@mstonlineacademy.com	2	\N	t
280	to_generate_UnaHa	UnaHa	una.hart@mstonlineacademy.com	2	\N	t
281	to_generate_CarolynCa	CarolynCa	carolyn.campbell@mstonlineacademy.com	2	\N	t
282	to_generate_RoseMa	RoseMa	rose.mackay@mstonlineacademy.com	2	\N	t
283	to_generate_StephanieRo	StephanieRo	stephanie.roberts@mstonlineacademy.com	2	\N	t
284	to_generate_PiersNo	PiersNo	piers.nolan@mstonlineacademy.com	2	\N	t
285	to_generate_OliviaBo	OliviaBo	olivia.bond@mstonlineacademy.com	2	\N	t
286	to_generate_JoanneRa	JoanneRa	joanne.randall@mstonlineacademy.com	2	\N	t
287	to_generate_CarlJa	CarlJa	carl.jackson@mstonlineacademy.com	2	\N	t
288	to_generate_AvaJa	AvaJa	ava.james@mstonlineacademy.com	2	\N	t
289	to_generate_RichardLe	RichardLe	richard.lewis@mstonlineacademy.com	2	\N	t
290	to_generate_SeanCh	SeanCh	sean.chapman@mstonlineacademy.com	2	\N	t
291	to_generate_LeonardWi	LeonardWi	leonard.wilson@mstonlineacademy.com	2	\N	t
292	to_generate_DorothyBu	DorothyBu	dorothy.burgess@mstonlineacademy.com	2	\N	t
293	to_generate_IreneLa	IreneLa	irene.lambert@mstonlineacademy.com	2	\N	t
294	to_generate_UnaJo	UnaJo	una.johnston@mstonlineacademy.com	2	\N	t
295	to_generate_NicholasGl	NicholasGl	nicholas.glover@mstonlineacademy.com	2	\N	t
296	to_generate_HannahUn	HannahUn	hannah.underwood@mstonlineacademy.com	2	\N	t
297	to_generate_StephanieBa	StephanieBa	stephanie.ball@mstonlineacademy.com	2	\N	t
298	to_generate_EricIn	EricIn	eric.ince@mstonlineacademy.com	2	\N	t
299	to_generate_DorothyHu	DorothyHu	dorothy.hudson@mstonlineacademy.com	2	\N	t
300	to_generate_JosephHo	JosephHo	joseph.hodges@mstonlineacademy.com	2	\N	t
301	to_generate_ElizabethBa	ElizabethBa	elizabeth.ball@mstonlineacademy.com	2	\N	t
302	to_generate_SueTe	SueTe	sue.terry@mstonlineacademy.com	2	\N	t
303	to_generate_NicolaBo	NicolaBo	nicola.bower@mstonlineacademy.com	2	\N	t
304	to_generate_RobertGr	RobertGr	robert.gray@mstonlineacademy.com	2	\N	t
305	to_generate_ChristianBo	ChristianBo	christian.bond@mstonlineacademy.com	2	\N	t
306	to_generate_JoanNo	JoanNo	joan.north@mstonlineacademy.com	2	\N	t
307	to_generate_WendyRo	WendyRo	wendy.roberts@mstonlineacademy.com	2	\N	t
308	to_generate_WarrenBe	WarrenBe	warren.berry@mstonlineacademy.com	2	\N	t
309	to_generate_JoshuaYo	JoshuaYo	joshua.young@mstonlineacademy.com	2	\N	t
310	to_generate_CharlesPo	CharlesPo	charles.powell@mstonlineacademy.com	2	\N	t
311	to_generate_KatherineEd	KatherineEd	katherine.edmunds@mstonlineacademy.com	2	\N	t
312	to_generate_AmeliaSt	AmeliaSt	amelia.stewart@mstonlineacademy.com	2	\N	t
313	to_generate_NicholasKi	NicholasKi	nicholas.king@mstonlineacademy.com	2	\N	t
314	to_generate_KylieYo	KylieYo	kylie.young@mstonlineacademy.com	2	\N	t
315	to_generate_NicolaYo	NicolaYo	nicola.young@mstonlineacademy.com	2	\N	t
316	to_generate_HarryLe	HarryLe	harry.lewis@mstonlineacademy.com	2	\N	t
317	to_generate_BrianRo	BrianRo	brian.roberts@mstonlineacademy.com	2	\N	t
318	to_generate_EdwardWa	EdwardWa	edward.walsh@mstonlineacademy.com	2	\N	t
319	to_generate_DeirdreSh	DeirdreSh	deirdre.sharp@mstonlineacademy.com	2	\N	t
320	to_generate_RichardDi	RichardDi	richard.dickens@mstonlineacademy.com	2	\N	t
321	to_generate_SimonBu	SimonBu	simon.butler@mstonlineacademy.com	2	\N	t
322	to_generate_BorisRa	BorisRa	boris.rampling@mstonlineacademy.com	2	\N	t
323	to_generate_WarrenHu	WarrenHu	warren.hudson@mstonlineacademy.com	2	\N	t
324	to_generate_ChloeWa	ChloeWa	chloe.watson@mstonlineacademy.com	2	\N	t
325	to_generate_JessicaRo	JessicaRo	jessica.robertson@mstonlineacademy.com	2	\N	t
326	to_generate_SarahMa	SarahMa	sarah.mackenzie@mstonlineacademy.com	2	\N	t
327	to_generate_AnnaGi	AnnaGi	anna.gill@mstonlineacademy.com	2	\N	t
328	to_generate_ClaireRe	ClaireRe	claire.rees@mstonlineacademy.com	2	\N	t
329	to_generate_DanRo	DanRo	dan.ross@mstonlineacademy.com	2	\N	t
330	to_generate_MichelleTu	MichelleTu	michelle.tucker@mstonlineacademy.com	2	\N	t
331	to_generate_DeirdreGi	DeirdreGi	deirdre.gill@mstonlineacademy.com	2	\N	t
332	to_generate_ChloeHu	ChloeHu	chloe.hunter@mstonlineacademy.com	2	\N	t
333	to_generate_MattRu	MattRu	matt.rutherford@mstonlineacademy.com	2	\N	t
334	to_generate_AlexandraSl	AlexandraSl	alexandra.slater@mstonlineacademy.com	2	\N	t
335	to_generate_BenjaminRo	BenjaminRo	benjamin.robertson@mstonlineacademy.com	2	\N	t
336	to_generate_JoanneGr	JoanneGr	joanne.grant@mstonlineacademy.com	2	\N	t
337	to_generate_TrevorDo	TrevorDo	trevor.dowd@mstonlineacademy.com	2	\N	t
338	to_generate_AnnaPa	AnnaPa	anna.paige@mstonlineacademy.com	2	\N	t
339	to_generate_EricMc	EricMc	eric.mcdonald@mstonlineacademy.com	2	\N	t
340	to_generate_StevenRo	StevenRo	steven.ross@mstonlineacademy.com	2	\N	t
341	to_generate_CarlMa	CarlMa	carl.macdonald@mstonlineacademy.com	2	\N	t
342	to_generate_DianaHa	DianaHa	diana.hamilton@mstonlineacademy.com	2	\N	t
343	to_generate_IsaacRe	IsaacRe	isaac.reid@mstonlineacademy.com	2	\N	t
344	to_generate_HarryJo	HarryJo	harry.johnston@mstonlineacademy.com	2	\N	t
345	to_generate_ColinSi	ColinSi	colin.simpson@mstonlineacademy.com	2	\N	t
346	to_generate_BrianWe	BrianWe	brian.welch@mstonlineacademy.com	2	\N	t
347	to_generate_AnnaBu	AnnaBu	anna.butler@mstonlineacademy.com	2	\N	t
348	to_generate_AndreaPi	AndreaPi	andrea.piper@mstonlineacademy.com	2	\N	t
349	to_generate_GordonWa	GordonWa	gordon.wallace@mstonlineacademy.com	2	\N	t
350	to_generate_JosephRa	JosephRa	joseph.randall@mstonlineacademy.com	2	\N	t
351	to_generate_TraceyKi	TraceyKi	tracey.king@mstonlineacademy.com	2	\N	t
352	to_generate_LaurenBa	LaurenBa	lauren.bailey@mstonlineacademy.com	2	\N	t
353	to_generate_SamDu	SamDu	sam.duncan@mstonlineacademy.com	2	\N	t
354	to_generate_WandaTu	WandaTu	wanda.tucker@mstonlineacademy.com	2	\N	t
355	to_generate_SueHi	SueHi	sue.hill@mstonlineacademy.com	2	\N	t
356	to_generate_ElizabethSh	ElizabethSh	elizabeth.sharp@mstonlineacademy.com	2	\N	t
357	to_generate_SeanBl	SeanBl	sean.blake@mstonlineacademy.com	2	\N	t
358	to_generate_AlisonWa	AlisonWa	alison.walker@mstonlineacademy.com	2	\N	t
359	to_generate_MichelleGl	MichelleGl	michelle.glover@mstonlineacademy.com	2	\N	t
360	to_generate_EvanVa	EvanVa	evan.vance@mstonlineacademy.com	2	\N	t
361	to_generate_MichaelMe	MichaelMe	michael.metcalfe@mstonlineacademy.com	2	\N	t
362	to_generate_LisaGr	LisaGr	lisa.grant@mstonlineacademy.com	2	\N	t
363	to_generate_SuePa	SuePa	sue.paterson@mstonlineacademy.com	2	\N	t
364	to_generate_GavinHa	GavinHa	gavin.hart@mstonlineacademy.com	2	\N	t
365	to_generate_AnneFr	AnneFr	anne.fraser@mstonlineacademy.com	2	\N	t
366	to_generate_KylieBo	KylieBo	kylie.bond@mstonlineacademy.com	2	\N	t
367	to_generate_KarenMa	KarenMa	karen.marshall@mstonlineacademy.com	2	\N	t
368	to_generate_StevenCa	StevenCa	steven.campbell@mstonlineacademy.com	2	\N	t
369	to_generate_CameronGi	CameronGi	cameron.gibson@mstonlineacademy.com	2	\N	t
370	to_generate_JosephCl	JosephCl	joseph.clarkson@mstonlineacademy.com	2	\N	t
371	to_generate_RyanBa	RyanBa	ryan.bailey@mstonlineacademy.com	2	\N	t
372	to_generate_SoniaMe	SoniaMe	sonia.metcalfe@mstonlineacademy.com	2	\N	t
373	to_generate_ThomasPi	ThomasPi	thomas.piper@mstonlineacademy.com	2	\N	t
374	to_generate_AndrewJa	AndrewJa	andrew.jackson@mstonlineacademy.com	2	\N	t
375	to_generate_IsaacPa	IsaacPa	isaac.parsons@mstonlineacademy.com	2	\N	t
376	to_generate_AustinMi	AustinMi	austin.miller@mstonlineacademy.com	2	\N	t
377	to_generate_RyanGi	RyanGi	ryan.gill@mstonlineacademy.com	2	\N	t
378	to_generate_AlexandraFi	AlexandraFi	alexandra.fisher@mstonlineacademy.com	2	\N	t
379	to_generate_GabrielleHo	GabrielleHo	gabrielle.howard@mstonlineacademy.com	2	\N	t
380	to_generate_LisaJa	LisaJa	lisa.james@mstonlineacademy.com	2	\N	t
381	to_generate_WandaBe	WandaBe	wanda.bell@mstonlineacademy.com	2	\N	t
382	to_generate_AudreyMa	AudreyMa	audrey.macleod@mstonlineacademy.com	2	\N	t
383	to_generate_AlisonAb	AlisonAb	alison.abraham@mstonlineacademy.com	2	\N	t
384	to_generate_MaxMa	MaxMa	max.manning@mstonlineacademy.com	2	\N	t
385	to_generate_RichardPu	RichardPu	richard.pullman@mstonlineacademy.com	2	\N	t
386	to_generate_RyanLa	RyanLa	ryan.lambert@mstonlineacademy.com	2	\N	t
387	to_generate_LisaCa	LisaCa	lisa.campbell@mstonlineacademy.com	2	\N	t
388	to_generate_DavidSc	DavidSc	david.scott@mstonlineacademy.com	2	\N	t
389	to_generate_AvaSh	AvaSh	ava.short@mstonlineacademy.com	2	\N	t
390	to_generate_JasonAn	JasonAn	jason.anderson@mstonlineacademy.com	2	\N	t
391	to_generate_EdwardAr	EdwardAr	edward.arnold@mstonlineacademy.com	2	\N	t
392	to_generate_VictoriaYo	VictoriaYo	victoria.young@mstonlineacademy.com	2	\N	t
393	to_generate_DeirdreJa	DeirdreJa	deirdre.james@mstonlineacademy.com	2	\N	t
394	to_generate_JustinKe	JustinKe	justin.kelly@mstonlineacademy.com	2	\N	t
395	to_generate_LilySh	LilySh	lily.short@mstonlineacademy.com	2	\N	t
396	to_generate_NathanGr	NathanGr	nathan.greene@mstonlineacademy.com	2	\N	t
397	to_generate_ConnorUn	ConnorUn	connor.underwood@mstonlineacademy.com	2	\N	t
398	to_generate_JasonWe	JasonWe	jason.welch@mstonlineacademy.com	2	\N	t
399	to_generate_RobertBe	RobertBe	robert.berry@mstonlineacademy.com	2	\N	t
400	to_generate_DianaJa	DianaJa	diana.james@mstonlineacademy.com	2	\N	t
401	to_generate_TheresaEd	TheresaEd	theresa.edmunds@mstonlineacademy.com	2	\N	t
402	to_generate_ChristopherAb	ChristopherAb	christopher.abraham@mstonlineacademy.com	2	\N	t
403	to_generate_SebastianJo	SebastianJo	sebastian.jones@mstonlineacademy.com	2	\N	t
404	to_generate_KatherineMa	KatherineMa	katherine.martin@mstonlineacademy.com	2	\N	t
405	to_generate_HeatherBu	HeatherBu	heather.buckland@mstonlineacademy.com	2	\N	t
406	to_generate_MadeleineHa	MadeleineHa	madeleine.harris@mstonlineacademy.com	2	\N	t
407	to_generate_GabriellePa	GabriellePa	gabrielle.parsons@mstonlineacademy.com	2	\N	t
408	to_generate_IsaacWi	IsaacWi	isaac.wilkins@mstonlineacademy.com	2	\N	t
409	to_generate_LucasQu	LucasQu	lucas.quinn@mstonlineacademy.com	2	\N	t
410	to_generate_MeganPe	MeganPe	megan.peake@mstonlineacademy.com	2	\N	t
411	to_generate_SueWa	SueWa	sue.watson@mstonlineacademy.com	2	\N	t
412	to_generate_MichellePa	MichellePa	michelle.parsons@mstonlineacademy.com	2	\N	t
413	to_generate_KatherineMo	KatherineMo	katherine.morrison@mstonlineacademy.com	2	\N	t
414	to_generate_AnthonyMi	AnthonyMi	anthony.miller@mstonlineacademy.com	2	\N	t
415	to_generate_JasonDi	JasonDi	jason.dickens@mstonlineacademy.com	2	\N	t
416	to_generate_EllaEl	EllaEl	ella.ellison@mstonlineacademy.com	2	\N	t
417	to_generate_SarahNo	SarahNo	sarah.nolan@mstonlineacademy.com	2	\N	t
418	to_generate_ChloeGi	ChloeGi	chloe.gibson@mstonlineacademy.com	2	\N	t
419	to_generate_JoshuaWa	JoshuaWa	joshua.walker@mstonlineacademy.com	2	\N	t
420	to_generate_SamAl	SamAl	sam.alsop@mstonlineacademy.com	2	\N	t
421	to_generate_StewartLy	StewartLy	stewart.lyman@mstonlineacademy.com	2	\N	t
422	to_generate_BorisBu	BorisBu	boris.butler@mstonlineacademy.com	2	\N	t
423	to_generate_SamanthaDy	SamanthaDy	samantha.dyer@mstonlineacademy.com	2	\N	t
424	to_generate_DorothyMi	DorothyMi	dorothy.miller@mstonlineacademy.com	2	\N	t
425	to_generate_AdrianFi	AdrianFi	adrian.fisher@mstonlineacademy.com	2	\N	t
\.


--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 326
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public
--

SELECT pg_catalog.setval('users_user_id_seq', 486, true);


--
-- TOC entry 3243 (class 2606 OID 1783843)
-- Name: degree_program_area_degree_program_area_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY degree_program_area
    ADD CONSTRAINT degree_program_area_degree_program_area_id PRIMARY KEY (degree_program_area_id);


--
-- TOC entry 3245 (class 2606 OID 1783845)
-- Name: degrees_degree_code; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY degrees
    ADD CONSTRAINT degrees_degree_code UNIQUE (degree_code);


--
-- TOC entry 3247 (class 2606 OID 1783847)
-- Name: degrees_degree_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY degrees
    ADD CONSTRAINT degrees_degree_id PRIMARY KEY (degree_id);


--
-- TOC entry 3249 (class 2606 OID 1783849)
-- Name: mentors_mentor_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY mentors
    ADD CONSTRAINT mentors_mentor_id PRIMARY KEY (mentor_id);


--
-- TOC entry 3251 (class 2606 OID 1783851)
-- Name: papers_paper_code; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY papers
    ADD CONSTRAINT papers_paper_code UNIQUE (paper_code);


--
-- TOC entry 3253 (class 2606 OID 1783853)
-- Name: papers_paper_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY papers
    ADD CONSTRAINT papers_paper_id PRIMARY KEY (paper_id);


--
-- TOC entry 3255 (class 2606 OID 1783855)
-- Name: program_areas_program_area_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY program_areas
    ADD CONSTRAINT program_areas_program_area_id PRIMARY KEY (program_area_id);


--
-- TOC entry 3257 (class 2606 OID 1783857)
-- Name: programs_program_code; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY programs
    ADD CONSTRAINT programs_program_code UNIQUE (program_code);


--
-- TOC entry 3259 (class 2606 OID 1783859)
-- Name: programs_program_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY programs
    ADD CONSTRAINT programs_program_id PRIMARY KEY (program_id);


--
-- TOC entry 3261 (class 2606 OID 1783861)
-- Name: roles_role_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_role_id PRIMARY KEY (role_id);


--
-- TOC entry 3263 (class 2606 OID 1783863)
-- Name: roles_role_name; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY roles
    ADD CONSTRAINT roles_role_name UNIQUE (role_name);


--
-- TOC entry 3265 (class 2606 OID 1783865)
-- Name: sessions_session_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_session_id PRIMARY KEY (session_id);


--
-- TOC entry 3267 (class 2606 OID 1783867)
-- Name: student_details_student_detail_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY student_details
    ADD CONSTRAINT student_details_student_detail_id PRIMARY KEY (student_detail_id);


--
-- TOC entry 3269 (class 2606 OID 1783869)
-- Name: user_logins_user_login_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY user_logins
    ADD CONSTRAINT user_logins_user_login_id PRIMARY KEY (user_login_id);


--
-- TOC entry 3271 (class 2606 OID 1783871)
-- Name: user_passwords_user_password_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY user_passwords
    ADD CONSTRAINT user_passwords_user_password_id PRIMARY KEY (user_password_id);


--
-- TOC entry 3273 (class 2606 OID 1783873)
-- Name: users_email; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_email UNIQUE (email);


--
-- TOC entry 3275 (class 2606 OID 1783875)
-- Name: users_unique_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_unique_id UNIQUE (unique_id);


--
-- TOC entry 3277 (class 2606 OID 1783877)
-- Name: users_user_id; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_user_id PRIMARY KEY (user_id);


--
-- TOC entry 3279 (class 2606 OID 1783879)
-- Name: users_username; Type: CONSTRAINT; Schema: public
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_username UNIQUE (username);


--
-- TOC entry 3280 (class 2606 OID 1783921)
-- Name: degree_program_area_degree_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY degree_program_area
    ADD CONSTRAINT degree_program_area_degree_id_fkey FOREIGN KEY (degree_id) REFERENCES degrees(degree_id);


--
-- TOC entry 3281 (class 2606 OID 1783926)
-- Name: degree_program_area_program_area_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY degree_program_area
    ADD CONSTRAINT degree_program_area_program_area_id_fkey FOREIGN KEY (program_area_id) REFERENCES program_areas(program_area_id);


--
-- TOC entry 3282 (class 2606 OID 1783931)
-- Name: mentors_user_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY mentors
    ADD CONSTRAINT mentors_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);


--
-- TOC entry 3283 (class 2606 OID 1783936)
-- Name: papers_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY papers
    ADD CONSTRAINT papers_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES mentors(mentor_id);


--
-- TOC entry 3284 (class 2606 OID 1783941)
-- Name: papers_program_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY papers
    ADD CONSTRAINT papers_program_id_fkey FOREIGN KEY (program_id) REFERENCES programs(program_id);


--
-- TOC entry 3285 (class 2606 OID 1783946)
-- Name: programs_degree_program_area_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY programs
    ADD CONSTRAINT programs_degree_program_area_id_fkey FOREIGN KEY (degree_program_area_id) REFERENCES degree_program_area(degree_program_area_id);


--
-- TOC entry 3286 (class 2606 OID 1783951)
-- Name: sessions_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES mentors(mentor_id);


--
-- TOC entry 3287 (class 2606 OID 1783956)
-- Name: sessions_paper_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY sessions
    ADD CONSTRAINT sessions_paper_id_fkey FOREIGN KEY (paper_id) REFERENCES papers(paper_id);


--
-- TOC entry 3288 (class 2606 OID 1783961)
-- Name: student_details_mentor_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY student_details
    ADD CONSTRAINT student_details_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES mentors(mentor_id);


--
-- TOC entry 3289 (class 2606 OID 1783966)
-- Name: student_details_paper_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY student_details
    ADD CONSTRAINT student_details_paper_id_fkey FOREIGN KEY (paper_id) REFERENCES papers(paper_id);


--
-- TOC entry 3290 (class 2606 OID 1783971)
-- Name: student_details_student_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY student_details
    ADD CONSTRAINT student_details_student_id_fkey FOREIGN KEY (student_id) REFERENCES users(user_id);


--
-- TOC entry 3291 (class 2606 OID 1783976)
-- Name: user_logins_user_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY user_logins
    ADD CONSTRAINT user_logins_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id);


--
-- TOC entry 3292 (class 2606 OID 1783981)
-- Name: user_passwords_user_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY user_passwords
    ADD CONSTRAINT user_passwords_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3293 (class 2606 OID 1783986)
-- Name: users_role_id_fkey; Type: FK CONSTRAINT; Schema: public
--

ALTER TABLE ONLY users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(role_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


-- Completed on 2016-10-18 11:20:49

--
-- PostgreSQL database dump complete
--

