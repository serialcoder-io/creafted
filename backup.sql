--
-- PostgreSQL database dump
--

\restrict 8darSLfyPJ2WHlJ9FUECvLedXSyMl9YZwfvZ17wePtm4jcZHSmQnGiwmwQPuytW

-- Dumped from database version 17.6 (0d47993)
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: OrderStatus; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."OrderStatus" AS ENUM (
    'PENDING',
    'PAID',
    'SHIPPED',
    'CANCELLED'
);


ALTER TYPE public."OrderStatus" OWNER TO neondb_owner;

--
-- Name: OrderType; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."OrderType" AS ENUM (
    'ORDER',
    'PRE_ORDER'
);


ALTER TYPE public."OrderType" OWNER TO neondb_owner;

--
-- Name: Role; Type: TYPE; Schema: public; Owner: neondb_owner
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


ALTER TYPE public."Role" OWNER TO neondb_owner;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Address" (
    id text NOT NULL,
    "fullName" text NOT NULL,
    street text NOT NULL,
    city text NOT NULL,
    "postalCode" text NOT NULL,
    phone text,
    "isDefault" boolean DEFAULT false NOT NULL,
    "userId" text
);


ALTER TABLE public."Address" OWNER TO neondb_owner;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Category" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text
);


ALTER TABLE public."Category" OWNER TO neondb_owner;

--
-- Name: Order; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Order" (
    id text NOT NULL,
    "orderType" public."OrderType" NOT NULL,
    status public."OrderStatus" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    "userId" text,
    city text NOT NULL,
    "fullName" text NOT NULL,
    phone text,
    "postalCode" text NOT NULL,
    street text NOT NULL
);


ALTER TABLE public."Order" OWNER TO neondb_owner;

--
-- Name: OrderItem; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."OrderItem" (
    id text NOT NULL,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL,
    "orderId" text NOT NULL
);


ALTER TABLE public."OrderItem" OWNER TO neondb_owner;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."Product" (
    id text NOT NULL,
    name text NOT NULL,
    slug text NOT NULL,
    description text,
    image text,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    min_price numeric(10,2)
);


ALTER TABLE public."Product" OWNER TO neondb_owner;

--
-- Name: ProductVariant; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."ProductVariant" (
    id text NOT NULL,
    name text NOT NULL,
    price numeric(10,2) NOT NULL,
    stock integer DEFAULT 0 NOT NULL,
    "productId" text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."ProductVariant" OWNER TO neondb_owner;

--
-- Name: User; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."User" (
    id text NOT NULL,
    first_name text,
    last_name text,
    email text NOT NULL,
    password text NOT NULL,
    role public."Role" NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO neondb_owner;

--
-- Name: VariantImage; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."VariantImage" (
    id text NOT NULL,
    url text NOT NULL,
    alt text NOT NULL,
    "sortOrder" integer NOT NULL,
    "productVariantId" text NOT NULL,
    "isDefault" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."VariantImage" OWNER TO neondb_owner;

--
-- Name: _CategoryToProduct; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public."_CategoryToProduct" (
    "A" text NOT NULL,
    "B" text NOT NULL
);


ALTER TABLE public."_CategoryToProduct" OWNER TO neondb_owner;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO neondb_owner;

--
-- Data for Name: Address; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Address" (id, "fullName", street, city, "postalCode", phone, "isDefault", "userId") FROM stdin;
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Category" (id, name, slug, description) FROM stdin;
42c98f48-d037-4fef-99c6-ce51f6341051	Bracelets	bracelets	\N
74a1f0e8-7ac7-4321-a4a1-81aef077209b	Amigurumi	amigurumi	\N
1edaa8ee-9a55-42dc-87ba-f38807cbef7a	All	all	Browse our entire collection
3b57ca1a-867c-4cc7-8c70-585b27c1ceec	Phone Cases	phone-cases	Custom phone accessories
ee6028f9-ddf0-479c-87b1-22ba8522e01c	Crafts	crafts	Unique handmade crafts
fac817c9-1396-4dce-a86a-74b8de6ec5c8	Crochet	crochet	Handmade crochet items
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Order" (id, "orderType", status, created_at, updated_at, "userId", city, "fullName", phone, "postalCode", street) FROM stdin;
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."OrderItem" (id, quantity, price, "orderId") FROM stdin;
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."Product" (id, name, slug, description, image, created_at, updated_at, min_price) FROM stdin;
e50c3326-4d9c-413a-9157-1ce9ea2899ac	Macramé Wall Hanging	macramé-wall-hanging	Elegant macramé wall hanging made with natural cotton rope. Features intricate knotwork and wooden dowel. Measures 24x36 inches.	https://res.cloudinary.com/dfpg5mjcm/image/upload/v1764006613/Macram%C3%A9_Wall_Hanging_llsuom.png	2025-11-24 17:35:24.684	2025-11-24 17:50:48.348	\N
0323cc1a-4018-460e-a174-498ef69a3fbe	Crochet Tote Bag	crochet-tote-bag	Stylish and durable crochet tote bag, perfect for shopping or beach days. Features cotton yarn and reinforced handles.	https://res.cloudinary.com/dfpg5mjcm/image/upload/v1764004381/BAGA0050_ot3iqf.webp	2025-11-24 17:35:24.684	2025-11-24 22:41:35.216	35.00
1165ad95-fa18-4610-b2c1-19bc3d304731	Floral Phone Case	floral-phone-case	Beautiful handmade phone case with pressed flowers and resin coating. Available for iPhone and Samsung models. Each case is unique.	https://res.cloudinary.com/dfpg5mjcm/image/upload/v1764005829/Floral_phone_case_fsrfbg.webp	2025-11-24 17:35:24.684	2025-11-24 22:41:35.216	15.00
1532dbf6-fb24-429c-8dd7-44cb2e3fd7b7	Crochet Plant Hanger	crochet-plant-hanger	Bohemian-style crochet plant hanger for indoor plants. Adjustable length up to 40 inches. Fits pots up to 8 inches in diameter.	https://res.cloudinary.com/dfpg5mjcm/image/upload/v1764005945/crochet-plant-hanger_tquxqr.webp	2025-11-24 17:35:24.684	2025-11-24 22:41:35.216	20.00
19b20212-ec06-4229-8f91-720d317e9eff	Cozy Crochet Blanket	cozy-crochet-blanket	A soft and cozy handmade crochet blanket perfect for chilly evenings. Made with premium yarn.	https://res.cloudinary.com/dfpg5mjcm/image/upload/v1764003834/Cozy_Crochet_Blanket_lp1cdr.webp	2025-11-24 17:06:08.855	2025-11-24 22:41:35.216	50.00
1df2dc48-33c5-492b-9719-461a38037e56	Crochet Scarf	crochet-scarf	Warm and stylish crochet infinity scarf. Made with soft merino wool blend. Available in multiple colors. Perfect for winter.	https://res.cloudinary.com/dfpg5mjcm/image/upload/v1764006041/scarf-crochet_r9i5an.webp	2025-11-24 17:35:24.684	2025-11-24 22:41:35.216	35.00
3053820c-5890-45e9-99c7-2e9035358ea5	Custom Leather Phone Case	custom-leather-phone-case	Premium leather phone case with personalization option. Features card slots and magnetic closure. Ages beautifully with use.	https://res.cloudinary.com/dfpg5mjcm/image/upload/v1764006281/Custom_Leather_Phone_Case_e1u48d.jpg	2025-11-24 17:35:24.684	2025-11-24 22:41:35.216	20.00
358ea0aa-0659-4dff-b0c3-3a693e0b5eab	Crochet Amigurumi Bear	crochet-amigurumi-bear	Adorable handmade crochet teddy bear, perfect as a gift or decoration. Filled with hypoallergenic stuffing. About 8 inches tall.	https://res.cloudinary.com/dfpg5mjcm/image/upload/v1764006313/Crochet_Amigurumi_Bear_vrlmhd.jpg	2025-11-24 17:35:24.684	2025-11-24 22:41:35.216	15.00
6c59eb68-935b-4722-aaac-580d0cb48467	Handmade Ceramic Mug	handmade-ceramic-mug	Unique handcrafted ceramic mug with organic shape and beautiful glaze. Microwave and dishwasher safe. Holds 12 oz.	https://res.cloudinary.com/dfpg5mjcm/image/upload/v1764006493/Handmade_Ceramic_Mug_fud7r6.webp	2025-11-24 17:35:24.684	2025-11-24 22:41:35.216	12.00
787521ff-a9e1-4609-bb73-598b0f44121d	Marble Phone Case	marble-phone-case	Sleek marble design phone case with gold accents. Shock-absorbent and slim profile. Compatible with wireless charging.	https://res.cloudinary.com/dfpg5mjcm/image/upload/v1764006519/Marble_Phone_Case_nb8e4d.webp	2025-11-24 17:35:24.684	2025-11-24 22:41:35.216	20.00
\.


--
-- Data for Name: ProductVariant; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."ProductVariant" (id, name, price, stock, "productId", created_at, updated_at, "isDefault") FROM stdin;
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."User" (id, first_name, last_name, email, password, role, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: VariantImage; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."VariantImage" (id, url, alt, "sortOrder", "productVariantId", "isDefault") FROM stdin;
\.


--
-- Data for Name: _CategoryToProduct; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public."_CategoryToProduct" ("A", "B") FROM stdin;
fac817c9-1396-4dce-a86a-74b8de6ec5c8	19b20212-ec06-4229-8f91-720d317e9eff
fac817c9-1396-4dce-a86a-74b8de6ec5c8	0323cc1a-4018-460e-a174-498ef69a3fbe
3b57ca1a-867c-4cc7-8c70-585b27c1ceec	1165ad95-fa18-4610-b2c1-19bc3d304731
fac817c9-1396-4dce-a86a-74b8de6ec5c8	358ea0aa-0659-4dff-b0c3-3a693e0b5eab
74a1f0e8-7ac7-4321-a4a1-81aef077209b	358ea0aa-0659-4dff-b0c3-3a693e0b5eab
3b57ca1a-867c-4cc7-8c70-585b27c1ceec	787521ff-a9e1-4609-bb73-598b0f44121d
ee6028f9-ddf0-479c-87b1-22ba8522e01c	6c59eb68-935b-4722-aaac-580d0cb48467
ee6028f9-ddf0-479c-87b1-22ba8522e01c	e50c3326-4d9c-413a-9157-1ce9ea2899ac
fac817c9-1396-4dce-a86a-74b8de6ec5c8	1532dbf6-fb24-429c-8dd7-44cb2e3fd7b7
3b57ca1a-867c-4cc7-8c70-585b27c1ceec	3053820c-5890-45e9-99c7-2e9035358ea5
fac817c9-1396-4dce-a86a-74b8de6ec5c8	1df2dc48-33c5-492b-9719-461a38037e56
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
7f108848-0a53-456d-982c-9f5775c656d9	65504916e70510b2b722e254c0d34c481535faa4ef2707746449a0c691c67ef1	2025-11-03 12:44:47.225328+00	20251103124443_init	\N	\N	2025-11-03 12:44:45.439921+00	1
80c1670d-e87c-47fe-b1f1-9aae35f1437d	76523fab9e81a32045632d0938edc47c1e0d8ba49eae3df69e77d55af55dbaa8	2025-11-04 11:18:13.663495+00	20251104111810_added_address_model_and_shipping_fields	\N	\N	2025-11-04 11:18:12.153+00	1
9aa96dd4-daec-49d3-bbe2-8c7ca89dffc7	f1e4064c839ad69354148810e4d02f6475ed6b5b351bdd2a0b97111455c9851f	2025-11-24 18:01:30.342552+00	20251124180127_added	\N	\N	2025-11-24 18:01:28.721568+00	1
45457c9b-2d88-47ab-a2ad-8055d3f3b865	2e2e2067218f041d5139b85d204daa7953590618f9660adfa54bd0e525b052ef	2025-11-24 21:05:16.487276+00	20251124210513_add_indexes	\N	\N	2025-11-24 21:05:15.021186+00	1
1aec293b-e180-4401-bb61-a83ae814986c	69a7cbae04707e555ba3243e091a7431045929962b878c9b1165e7f690275a68	2025-11-24 22:10:33.106173+00	20251124221029_added_field_description_in_model_category	\N	\N	2025-11-24 22:10:31.592765+00	1
\.


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: OrderItem OrderItem_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_pkey" PRIMARY KEY (id);


--
-- Name: Order Order_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_pkey" PRIMARY KEY (id);


--
-- Name: ProductVariant ProductVariant_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VariantImage VariantImage_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."VariantImage"
    ADD CONSTRAINT "VariantImage_pkey" PRIMARY KEY (id);


--
-- Name: _CategoryToProduct _CategoryToProduct_AB_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."_CategoryToProduct"
    ADD CONSTRAINT "_CategoryToProduct_AB_pkey" PRIMARY KEY ("A", "B");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Order_userId_orderType_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Order_userId_orderType_idx" ON public."Order" USING btree ("userId", "orderType");


--
-- Name: Product_slug_idx; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "Product_slug_idx" ON public."Product" USING btree (slug);


--
-- Name: Product_slug_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "Product_slug_key" ON public."Product" USING btree (slug);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: _CategoryToProduct_B_index; Type: INDEX; Schema: public; Owner: neondb_owner
--

CREATE INDEX "_CategoryToProduct_B_index" ON public."_CategoryToProduct" USING btree ("B");


--
-- Name: Address Address_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OrderItem OrderItem_orderId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."OrderItem"
    ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES public."Order"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Order Order_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."Order"
    ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: ProductVariant ProductVariant_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."ProductVariant"
    ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: VariantImage VariantImage_productVariantId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."VariantImage"
    ADD CONSTRAINT "VariantImage_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES public."ProductVariant"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CategoryToProduct _CategoryToProduct_A_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."_CategoryToProduct"
    ADD CONSTRAINT "_CategoryToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: _CategoryToProduct _CategoryToProduct_B_fkey; Type: FK CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public."_CategoryToProduct"
    ADD CONSTRAINT "_CategoryToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

\unrestrict 8darSLfyPJ2WHlJ9FUECvLedXSyMl9YZwfvZ17wePtm4jcZHSmQnGiwmwQPuytW

