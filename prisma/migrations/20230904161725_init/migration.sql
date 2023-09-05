/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Activity` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationTime` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environmentId` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "durationTime" INTEGER NOT NULL,
ADD COLUMN     "environmentId" INTEGER NOT NULL,
ADD COLUMN     "moderators" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "Activity_name_key" ON "Activity"("name");
