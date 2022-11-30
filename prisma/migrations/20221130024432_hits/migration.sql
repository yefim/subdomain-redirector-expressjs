-- CreateTable
CREATE TABLE "Hit" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userAgent" VARCHAR(255) NOT NULL,
    "ipAddr" VARCHAR(255) NOT NULL,

    CONSTRAINT "Hit_pkey" PRIMARY KEY ("id")
);
