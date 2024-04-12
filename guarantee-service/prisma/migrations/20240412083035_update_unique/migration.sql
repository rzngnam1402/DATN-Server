/*
  Warnings:

  - A unique constraint covering the columns `[applicant_detail_id]` on the table `guarantees` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[beneficiary_detail_id]` on the table `guarantees` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "guarantees_applicant_detail_id_key" ON "guarantees"("applicant_detail_id");

-- CreateIndex
CREATE UNIQUE INDEX "guarantees_beneficiary_detail_id_key" ON "guarantees"("beneficiary_detail_id");
