/*
  Warnings:

  - You are about to drop the column `senha` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `morada` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "senha";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "morada",
ADD COLUMN     "senha" TEXT;
