/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Board` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Board" DROP CONSTRAINT "Board_ownerId_fkey";

-- AlterTable
ALTER TABLE "Board" DROP COLUMN "ownerId";
