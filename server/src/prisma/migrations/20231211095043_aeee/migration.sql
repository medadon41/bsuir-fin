/*
  Warnings:

  - You are about to drop the column `activeUntill` on the `Token` table. All the data in the column will be lost.
  - Added the required column `activeUntil` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hash" TEXT NOT NULL,
    "localName" TEXT NOT NULL,
    "usagesAmount" INTEGER NOT NULL,
    "usagesLeft" INTEGER NOT NULL,
    "activeUntil" DATETIME NOT NULL,
    "maxAmount" REAL NOT NULL,
    "tokenStatus" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "Token_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Token" ("hash", "id", "localName", "maxAmount", "ownerId", "tokenStatus", "usagesAmount", "usagesLeft") SELECT "hash", "id", "localName", "maxAmount", "ownerId", "tokenStatus", "usagesAmount", "usagesLeft" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE UNIQUE INDEX "Token_hash_key" ON "Token"("hash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
