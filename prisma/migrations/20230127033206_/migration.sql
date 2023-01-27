/*
  Warnings:

  - Added the required column `fullName` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL
);
INSERT INTO "new_Event" ("name") SELECT "name" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
