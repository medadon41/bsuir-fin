-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "receiverAccount" TEXT NOT NULL,
    "minAmount" REAL NOT NULL,
    "maxAmount" REAL NOT NULL,
    "percent" REAL NOT NULL,
    "maxYears" REAL NOT NULL DEFAULT 0,
    "minYears" REAL NOT NULL DEFAULT 0
);
INSERT INTO "new_Credit" ("active", "id", "maxAmount", "maxYears", "minAmount", "percent", "receiverAccount", "title") SELECT "active", "id", "maxAmount", "maxYears", "minAmount", "percent", "receiverAccount", "title" FROM "Credit";
DROP TABLE "Credit";
ALTER TABLE "new_Credit" RENAME TO "Credit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
