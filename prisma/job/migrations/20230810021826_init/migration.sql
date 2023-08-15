/*
  Warnings:

  - You are about to drop the column `container_no` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `position_on_truck` on the `job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "job" DROP COLUMN "container_no",
DROP COLUMN "position_on_truck";

-- CreateTable
CREATE TABLE "job_container" (
    "id" TEXT NOT NULL,
    "job_id" TEXT NOT NULL,
    "container_no" TEXT NOT NULL,
    "position_on_truck" TEXT NOT NULL,

    CONSTRAINT "job_container_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_container" ADD CONSTRAINT "job_container_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
