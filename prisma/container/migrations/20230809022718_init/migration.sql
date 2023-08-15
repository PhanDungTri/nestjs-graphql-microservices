-- CreateTable
CREATE TABLE "container" (
    "container_no" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "class" TEXT NOT NULL,

    CONSTRAINT "container_pkey" PRIMARY KEY ("container_no")
);
