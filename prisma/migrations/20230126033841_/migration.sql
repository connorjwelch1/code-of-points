-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ElementGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "groupNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    CONSTRAINT "ElementGroup_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ElementGroup" ("description", "eventId", "groupNumber", "id") SELECT "description", "eventId", "groupNumber", "id" FROM "ElementGroup";
DROP TABLE "ElementGroup";
ALTER TABLE "new_ElementGroup" RENAME TO "ElementGroup";
CREATE TABLE "new_Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT 'A',
    "elementGroupId" TEXT NOT NULL,
    CONSTRAINT "Skill_elementGroupId_fkey" FOREIGN KEY ("elementGroupId") REFERENCES "ElementGroup" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("description", "elementGroupId", "id", "name") SELECT "description", "elementGroupId", "id", "name" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
