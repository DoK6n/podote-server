/*
  Warnings:

  - You are about to drop the column `createdDt` on the `TODO` table. All the data in the column will be lost.
  - You are about to drop the column `removedDt` on the `TODO` table. All the data in the column will be lost.
  - You are about to drop the column `updatedDt` on the `TODO` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TODO` table. All the data in the column will be lost.
  - You are about to drop the column `snsTypeId` on the `USER` table. All the data in the column will be lost.
  - Added the required column `removed_dt` to the `TODO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_dt` to the `TODO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `TODO` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sns_type_id` to the `USER` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TODO" DROP CONSTRAINT "TODO_userId_fkey";

-- DropForeignKey
ALTER TABLE "USER" DROP CONSTRAINT "USER_snsTypeId_fkey";

-- AlterTable
ALTER TABLE "TODO" DROP COLUMN "createdDt",
DROP COLUMN "removedDt",
DROP COLUMN "updatedDt",
DROP COLUMN "userId",
ADD COLUMN     "created_dt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "removed_dt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_dt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "USER" DROP COLUMN "snsTypeId",
ADD COLUMN     "sns_type_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "USER" ADD CONSTRAINT "USER_sns_type_id_fkey" FOREIGN KEY ("sns_type_id") REFERENCES "SNS_TYPE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TODO" ADD CONSTRAINT "TODO_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
