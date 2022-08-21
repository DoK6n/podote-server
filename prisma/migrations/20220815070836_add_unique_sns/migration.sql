/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `sns_type` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sns_type_name_key" ON "sns_type"("name");
