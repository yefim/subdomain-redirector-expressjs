/*
  Warnings:

  - Added the required column `shortLinkId` to the `Hit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hit" ADD COLUMN     "shortLinkId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Hit" ADD CONSTRAINT "Hit_shortLinkId_fkey" FOREIGN KEY ("shortLinkId") REFERENCES "ShortLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
