-- AlterTable
ALTER TABLE "container" ADD COLUMN     "date_created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date_updated" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
