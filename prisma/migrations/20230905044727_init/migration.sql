/*
  Warnings:

  - You are about to drop the column `date` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `endingTime` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `startingTime` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "date",
DROP COLUMN "endingTime",
DROP COLUMN "startingTime",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;
