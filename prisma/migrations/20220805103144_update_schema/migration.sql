/*
  Warnings:

  - You are about to drop the column `title` on the `Todo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_snsTypeId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "title";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "snsTypeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_snsTypeId_fkey" FOREIGN KEY ("snsTypeId") REFERENCES "SnsType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
