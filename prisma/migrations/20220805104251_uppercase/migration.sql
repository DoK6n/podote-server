/*
  Warnings:

  - You are about to drop the `SnsType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Todo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_snsTypeId_fkey";

-- DropTable
DROP TABLE "SnsType";

-- DropTable
DROP TABLE "Todo";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "USER" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "snsTypeId" INTEGER NOT NULL,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SNS_TYPE" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SNS_TYPE_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TODO" (
    "id" TEXT NOT NULL,
    "content" JSONB,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdDt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDt" TIMESTAMP(3) NOT NULL,
    "removedDt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TODO_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_email_key" ON "USER"("email");

-- AddForeignKey
ALTER TABLE "USER" ADD CONSTRAINT "USER_snsTypeId_fkey" FOREIGN KEY ("snsTypeId") REFERENCES "SNS_TYPE"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TODO" ADD CONSTRAINT "TODO_userId_fkey" FOREIGN KEY ("userId") REFERENCES "USER"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
