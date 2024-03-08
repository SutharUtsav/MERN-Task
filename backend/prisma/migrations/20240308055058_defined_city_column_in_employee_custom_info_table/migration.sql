/*
  Warnings:

  - Added the required column `city` to the `EmployeeCustomInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmployeeCustomInfo" ADD COLUMN     "city" TEXT NOT NULL;
