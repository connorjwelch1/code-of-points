/*
  Warnings:

  - You are about to drop the `Note` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Password` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - The primary key for the `Event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `ElementGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `eventId` on the `ElementGroup` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `ElementGroup` table. All the data in the column will be lost.
  - You are about to drop the column `elementGroupId` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `eventName` to the `ElementGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventName` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupNumber` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Password_userId_key";

-- DropIndex
DROP INDEX "User_email_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Note";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Password";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "name" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Event" ("name") SELECT "name" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE UNIQUE INDEX "Event_name_key" ON "Event"("name");
CREATE TABLE "new_ElementGroup" (
    "groupNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "eventName" TEXT NOT NULL,

    PRIMARY KEY ("eventName", "groupNumber"),
    CONSTRAINT "ElementGroup_eventName_fkey" FOREIGN KEY ("eventName") REFERENCES "Event" ("name") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ElementGroup" ("description", "groupNumber") SELECT "description", "groupNumber" FROM "ElementGroup";
DROP TABLE "ElementGroup";
ALTER TABLE "new_ElementGroup" RENAME TO "ElementGroup";
CREATE TABLE "new_Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "groupNumber" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    CONSTRAINT "Skill_groupNumber_eventName_fkey" FOREIGN KEY ("groupNumber", "eventName") REFERENCES "ElementGroup" ("groupNumber", "eventName") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("description", "id", "name", "value") SELECT "description", "id", "name", "value" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
