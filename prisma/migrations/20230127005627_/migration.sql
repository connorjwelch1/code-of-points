-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Skill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "groupNumber" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    CONSTRAINT "Skill_groupNumber_eventName_fkey" FOREIGN KEY ("groupNumber", "eventName") REFERENCES "ElementGroup" ("groupNumber", "eventName") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Skill_eventName_fkey" FOREIGN KEY ("eventName") REFERENCES "Event" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Skill" ("description", "eventName", "groupNumber", "id", "name", "value") SELECT "description", "eventName", "groupNumber", "id", "name", "value" FROM "Skill";
DROP TABLE "Skill";
ALTER TABLE "new_Skill" RENAME TO "Skill";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
