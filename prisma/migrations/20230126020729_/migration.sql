/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ElementGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "groupNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    CONSTRAINT "ElementGroup_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "elementGroupId" TEXT NOT NULL,
    CONSTRAINT "Skill_elementGroupId_fkey" FOREIGN KEY ("elementGroupId") REFERENCES "ElementGroup" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
