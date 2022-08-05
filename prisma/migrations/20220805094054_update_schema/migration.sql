/*
  Warnings:

  - Added the required column `snsTypeId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "snsTypeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "SnsType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SnsType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_snsTypeId_fkey" FOREIGN KEY ("snsTypeId") REFERENCES "SnsType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
