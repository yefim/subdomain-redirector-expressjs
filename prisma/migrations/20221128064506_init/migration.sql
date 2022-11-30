-- CreateTable
CREATE TABLE "ShortLink" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "host" TEXT NOT NULL,
    "redirectUrl" VARCHAR(255) NOT NULL,

    CONSTRAINT "ShortLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_host_key" ON "ShortLink"("host");
