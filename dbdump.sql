--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Ubuntu 12.4-1.pgdg16.04+1)
-- Dumped by pg_dump version 12.4

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

--
-- Name: trigger_set_timestamp(); Type: FUNCTION; Schema: public; Owner: iyytdeivocmihn
--

CREATE FUNCTION public.trigger_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.trigger_set_timestamp() OWNER TO iyytdeivocmihn;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: movies; Type: TABLE; Schema: public; Owner: iyytdeivocmihn
--

CREATE TABLE public.movies (
    id integer NOT NULL,
    title character varying(50),
    year smallint,
    thumb character varying(30),
    videourl character varying(30),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    imdb_stars real,
    imdb character varying(100)
);


ALTER TABLE public.movies OWNER TO iyytdeivocmihn;

--
-- Name: movies_id_seq; Type: SEQUENCE; Schema: public; Owner: iyytdeivocmihn
--

CREATE SEQUENCE public.movies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.movies_id_seq OWNER TO iyytdeivocmihn;

--
-- Name: movies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: iyytdeivocmihn
--

ALTER SEQUENCE public.movies_id_seq OWNED BY public.movies.id;


--
-- Name: movies id; Type: DEFAULT; Schema: public; Owner: iyytdeivocmihn
--

ALTER TABLE ONLY public.movies ALTER COLUMN id SET DEFAULT nextval('public.movies_id_seq'::regclass);


--
-- Data for Name: movies; Type: TABLE DATA; Schema: public; Owner: iyytdeivocmihn
--

COPY public.movies (id, title, year, thumb, videourl, created_at, updated_at, imdb_stars, imdb) FROM stdin;
3	Avengers: Endgame	2019	\N	https://youtu.be/TcMBFSGVi1c	2020-10-14 01:32:01.588256+00	2020-10-14 03:43:48.171698+00	8.4	https://www.imdb.com/title/tt4154796/?ref_=nv_sr_srsg_0
1	The Avengers	2012	\N	https://youtu.be/eOrNdBpGMv8	2020-10-12 20:30:24.56401+00	2020-10-14 03:44:34.176971+00	8	https://www.imdb.com/title/tt0848228/?ref_=fn_al_tt_1
2	The Incredible Hulk	2008	\N	https://youtu.be/xbqNb2PFKKA	2020-10-12 20:30:38.62663+00	2020-10-14 03:45:14.556519+00	6.7	https://www.imdb.com/title/tt0800080/?ref_=nv_sr_srsg_3
4	Avengers: Age of Ultron	2015	\N	https://youtu.be/P5iIPfNzj2o	2020-10-14 01:33:41.41182+00	2020-10-14 03:46:11.276883+00	7.3	https://www.imdb.com/title/tt2395427/?ref_=nv_sr_srsg_0
20	Captain Marvel	2019	\N	https://youtu.be/Z1BCujX3pw8	2020-10-14 03:48:41.675527+00	2020-10-14 03:54:39.020583+00	6.9	https://www.imdb.com/title/tt4154664/?ref_=fn_al_tt_1
21	Black Panther	2018	\N	https://youtu.be/xjDjIWPwcPU	2020-10-14 03:50:11.825365+00	2020-10-14 03:55:31.076169+00	7.3	https://www.imdb.com/title/tt1825683/?ref_=fn_al_tt_1
19	Captain America: The First Avenger	2011	\N	https://youtu.be/JerVrbLldXw	2020-10-14 03:32:58.575884+00	2020-10-14 03:56:35.196224+00	6.9	https://www.imdb.com/title/tt0458339/?ref_=nv_sr_srsg_0
18	Spider-Man: Into the Spider-Verse	2018	\N	https://youtu.be/g4Hbz2jLxvQ	2020-10-14 03:31:50.52592+00	2020-10-14 03:57:51.771759+00	8.4	https://www.imdb.com/title/tt4633694/?ref_=nv_sr_srsg_0
17	Spider-Man: Homecoming	2017	\N	https://youtu.be/n9DwoQ7HWvI	2020-10-14 01:50:43.811515+00	2020-10-14 03:58:36.131621+00	7.4	https://www.imdb.com/title/tt2250912/?ref_=nv_sr_srsg_6
16	Spider-Man: Far from Home	2019	\N	https://youtu.be/RWX2Kis5yYM	2020-10-14 01:49:37.44273+00	2020-10-14 03:59:10.182048+00	7.5	https://www.imdb.com/title/tt6320628/?ref_=nv_sr_srsg_3
15	Iron Man 3	2013	\N	https://youtu.be/oYSD2VQagc4	2020-10-14 01:47:08.705032+00	2020-10-14 03:59:53.491637+00	7.2	https://www.imdb.com/title/tt1300854/?ref_=nv_sr_srsg_0
14	Iron Man 2	2010	\N	https://youtu.be/BoohRoVA9WQ	2020-10-14 01:46:18.182241+00	2020-10-14 04:00:25.857396+00	7	https://www.imdb.com/title/tt1228705/?ref_=nv_sr_srsg_0
13	Iron Man	2008	\N	https://youtu.be/8ugaeA-nMTc	2020-10-14 01:45:29.313301+00	2020-10-14 04:01:00.552076+00	7.9	https://www.imdb.com/title/tt0371746/?ref_=fn_al_tt_1
12	Guardians of the Galaxy Vol. 2	2017	\N	https://youtu.be/wX0aiMVvnvg	2020-10-14 01:44:19.305872+00	2020-10-14 04:01:32.081985+00	7.6	https://www.imdb.com/title/tt3896198/?ref_=nv_sr_srsg_3
11	Guardians of the Galaxy	2014	\N	https://youtu.be/d96cjJhvlMA	2020-10-14 01:42:59.172008+00	2020-10-14 04:02:46.694942+00	8	https://www.imdb.com/title/tt2015381/?ref_=nv_sr_srsg_0
10	Doctor Strange	2016	\N	https://youtu.be/MWRUNTLisPo	2020-10-14 01:42:03.52876+00	2020-10-14 04:03:21.060832+00	7.5	https://www.imdb.com/title/tt2015381/?ref_=nv_sr_srsg_0
9	Thor: Ragnarok	2017	\N	https://youtu.be/ue80QwXMRHg	2020-10-14 01:40:53.481364+00	2020-10-14 04:04:11.086301+00	7.9	https://www.imdb.com/title/tt3501632/?ref_=nv_sr_srsg_0
8	Thor: The Dark World	2013	\N	https://youtu.be/npvJ9FTgZbM	2020-10-14 01:40:02.032332+00	2020-10-14 04:04:51.595745+00	6.9	https://www.imdb.com/title/tt1981115/?ref_=nv_sr_srsg_0
7	Thor	2011	\N	https://youtu.be/JOddp-nlNvQ	2020-10-14 01:39:05.547601+00	2020-10-14 04:05:29.741005+00	7	https://www.imdb.com/title/tt0800369/?ref_=fn_al_tt_1
6	Avengers: Infinity War	2018	\N	https://youtu.be/6ZfuNTqbHE8	2020-10-14 01:37:57.597412+00	2020-10-14 04:06:26.910962+00	8.4	https://www.imdb.com/title/tt4154756/?ref_=nv_sr_srsg_0
5	Captain America: Civil War	2016	\N	https://youtu.be/FkTybqcX-Yo	2020-10-14 01:35:10.709371+00	2020-10-14 04:07:07.180913+00	7.8	https://www.imdb.com/title/tt3498820/?ref_=nv_sr_srsg_3
\.


--
-- Name: movies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: iyytdeivocmihn
--

SELECT pg_catalog.setval('public.movies_id_seq', 21, true);


--
-- Name: movies movies_pkey; Type: CONSTRAINT; Schema: public; Owner: iyytdeivocmihn
--

ALTER TABLE ONLY public.movies
    ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


--
-- Name: movies set_timestamp; Type: TRIGGER; Schema: public; Owner: iyytdeivocmihn
--

CREATE TRIGGER set_timestamp BEFORE UPDATE ON public.movies FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: iyytdeivocmihn
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO iyytdeivocmihn;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO iyytdeivocmihn;


--
-- PostgreSQL database dump complete
--

