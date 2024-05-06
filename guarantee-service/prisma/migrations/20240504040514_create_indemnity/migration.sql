-- CreateEnum
CREATE TYPE "IndemnityStatus" AS ENUM ('PENDING', 'FULFILLED', 'REJECTED');

-- CreateTable
CREATE TABLE "Indemnity" (
    "indemnity_id" SERIAL NOT NULL,
    "status" "IndemnityStatus" NOT NULL DEFAULT 'PENDING',
    "guarantee_id" INTEGER NOT NULL,

    CONSTRAINT "Indemnity_pkey" PRIMARY KEY ("indemnity_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Indemnity_guarantee_id_key" ON "Indemnity"("guarantee_id");

-- AddForeignKey
ALTER TABLE "Indemnity" ADD CONSTRAINT "Indemnity_guarantee_id_fkey" FOREIGN KEY ("guarantee_id") REFERENCES "guarantees"("guarantee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
