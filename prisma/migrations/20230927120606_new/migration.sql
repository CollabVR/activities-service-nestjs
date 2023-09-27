/*
  Warnings:

  - You are about to drop the column `userName` on the `ActivityUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ActivityUser" DROP COLUMN "userName";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE INDEX "ActivityUser_userId_idx" ON "ActivityUser"("userId");

-- AddForeignKey
ALTER TABLE "ActivityUser" ADD CONSTRAINT "ActivityUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
