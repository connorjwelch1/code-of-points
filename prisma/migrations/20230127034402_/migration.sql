/*
  Warnings:

  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventName` on the `Skill` table. All the data in the column will be lost.
  - The primary key for the `ElementGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eventName` on the `ElementGroup` table. All the data in the column will be lost.
  - Added the required column `key` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventKey` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventKey` to the `ElementGroup` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL
);
INSERT INTO "new_Event" ("fullName") SELECT "fullName" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_key_key" ON "Event"("key");
CREATE TABLE "new_Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "groupNumber" INTEGER NOT NULL,
    "eventKey" TEXT NOT NULL,
    CONSTRAINT "Skill_groupNumber_eventKey_fkey" FOREIGN KEY ("groupNumber", "eventKey") REFERENCES "ElementGroup" ("groupNumber", "eventKey") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Skill_eventKey_fkey" FOREIGN KEY ("eventKey") REFERENCES "Event" ("key") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("description", "groupNumber", "id", "name", "value") SELECT "description", "groupNumber", "id", "name", "value" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
CREATE TABLE "new_ElementGroup" (
    "groupNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "eventKey" TEXT NOT NULL,

    PRIMARY KEY ("eventKey", "groupNumber"),
    CONSTRAINT "ElementGroup_eventKey_fkey" FOREIGN KEY ("eventKey") REFERENCES "Event" ("key") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ElementGroup" ("description", "groupNumber") SELECT "description", "groupNumber" FROM "ElementGroup";
DROP TABLE "ElementGroup";
ALTER TABLE "new_ElementGroup" RENAME TO "ElementGroup";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
