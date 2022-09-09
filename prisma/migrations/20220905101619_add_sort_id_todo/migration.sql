/*
  Warnings:

  - A unique constraint covering the columns `[sort_id]` on the table `todo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "todo" ADD COLUMN     "sort_id" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "todo_sort_id_key" ON "todo"("sort_id");
