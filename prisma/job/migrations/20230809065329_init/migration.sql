-- CreateTable
CREATE TABLE "job" (
    "id" TEXT NOT NULL,
    "container_no" TEXT NOT NULL,
    "truck_plate_no" TEXT NOT NULL,
    "position_on_truck" TEXT NOT NULL,
    "date_completed" TIMESTAMPTZ(6),
    "status" TEXT NOT NULL DEFAULT 'P',
    "type" TEXT NOT NULL,
    "date_created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);
