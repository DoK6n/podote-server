/*
  Warnings:

  - You are about to drop the column `sort_id` on the `todo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[order_key]` on the table `todo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "todo" DROP COLUMN "sort_id",
ADD COLUMN     "order_key" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "todo_order_key_key" ON "todo"("order_key");
