/*
  Warnings:

  - You are about to drop the column `is_inactive` on the `todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "is_inactive",
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;
