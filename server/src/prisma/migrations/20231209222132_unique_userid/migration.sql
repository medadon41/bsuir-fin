/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `StaffMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StaffMember_userId_key" ON "StaffMember"("userId");
