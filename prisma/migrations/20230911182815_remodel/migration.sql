/*
  Warnings:

  - You are about to drop the column `moderators` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `participants` on the `Activity` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PARTICIPANT', 'MODERATOR');

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "moderators",
DROP COLUMN "participants",
ALTER COLUMN "environmentId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "ActivityUser" (
    "id" SERIAL NOT NULL,
    "activityId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "ActivityUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ActivityUser_activityId_idx" ON "ActivityUser"("activityId");

-- AddForeignKey
ALTER TABLE "ActivityUser" ADD CONSTRAINT "ActivityUser_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
