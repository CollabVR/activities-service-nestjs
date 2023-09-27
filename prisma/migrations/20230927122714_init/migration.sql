/*
  Warnings:

  - A unique constraint covering the columns `[activityId,userId]` on the table `ActivityUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ActivityUser_activityId_userId_key" ON "ActivityUser"("activityId", "userId");
