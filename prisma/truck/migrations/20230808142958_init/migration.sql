-- CreateTable
CREATE TABLE "truck" (
    "plate_no" TEXT NOT NULL,
    "carrier" TEXT NOT NULL,
    "last_in_date" TIMESTAMPTZ(6) NOT NULL,
    "last_out_date" TIMESTAMPTZ(6) NOT NULL,
    "date_created" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "truck_pkey" PRIMARY KEY ("plate_no")
);
