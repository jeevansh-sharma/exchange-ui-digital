/*
  Warnings:

  - A unique constraint covering the columns `[connectedAccountId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `connectedAccountId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "connectedAccountId" TEXT NOT NULL,
ADD COLUMN     "stripeConnectedLinked" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "User_connectedAccountId_key" ON "User"("connectedAccountId");
