CREATE TABLE "users" (
	"id" serial NOT NULL,
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL,
	"name" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "books" (
	"id" serial NOT NULL,
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL,
	"name" TEXT NOT NULL,
	"author" TEXT NOT NULL,
	"pages" integer NOT NULL,
	CONSTRAINT "books_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "userBooks" (
	"id" serial NOT NULL,
	"createdAt" timestamp without time zone DEFAULT now() NOT NULL,
	"bookId" integer NOT NULL,
	"userId" integer NOT NULL,
	"read" BOOLEAN NOT NULL,
	CONSTRAINT "userBooks_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "userBooks" ADD CONSTRAINT "userBooks_fk0" FOREIGN KEY ("bookId") REFERENCES "books"("id");
ALTER TABLE "userBooks" ADD CONSTRAINT "userBooks_fk1" FOREIGN KEY ("userId") REFERENCES "users"("id");