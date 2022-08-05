/*
  Warnings:

  - You are about to drop the `SNS_TYPE` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TODO` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `USER` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TODO" DROP CONSTRAINT "TODO_user_id_fkey";

-- DropForeignKey
ALTER TABLE "USER" DROP CONSTRAINT "USER_sns_type_id_fkey";

-- DropTable
DROP TABLE "SNS_TYPE";

-- DropTable
DROP TABLE "TODO";

-- DropTable
DROP TABLE "USER";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sns_type_id" INTEGER NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sns_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sns_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo" (
    "id" TEXT NOT NULL,
    "content" JSONB,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "created_dt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_dt" TIMESTAMP(3) NOT NULL,
    "removed_dt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_sns_type_id_fkey" FOREIGN KEY ("sns_type_id") REFERENCES "sns_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "todo" ADD CONSTRAINT "todo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
