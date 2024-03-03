-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('TRAM', 'BUS', 'TRAIN');

-- CreateTable
CREATE TABLE "stops" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "mode" "Mode" NOT NULL,
    "direction" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "stops_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "departures" (
    "id" SERIAL NOT NULL,
    "stopId" INTEGER NOT NULL,
    "departure_time" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "connections" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "connections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConnectionToStop" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "stops_title_mode_direction_key" ON "stops"("title", "mode", "direction");

-- CreateIndex
CREATE UNIQUE INDEX "departures_stopId_departure_time_key" ON "departures"("stopId", "departure_time");

-- CreateIndex
CREATE UNIQUE INDEX "connections_title_userId_key" ON "connections"("title", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_ConnectionToStop_AB_unique" ON "_ConnectionToStop"("A", "B");

-- CreateIndex
CREATE INDEX "_ConnectionToStop_B_index" ON "_ConnectionToStop"("B");

-- AddForeignKey
ALTER TABLE "departures" ADD CONSTRAINT "departures_stopId_fkey" FOREIGN KEY ("stopId") REFERENCES "stops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "connections" ADD CONSTRAINT "connections_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConnectionToStop" ADD CONSTRAINT "_ConnectionToStop_A_fkey" FOREIGN KEY ("A") REFERENCES "connections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConnectionToStop" ADD CONSTRAINT "_ConnectionToStop_B_fkey" FOREIGN KEY ("B") REFERENCES "stops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
