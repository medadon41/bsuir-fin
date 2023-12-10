/*
  Warnings:

  - You are about to drop the column `publicKey` on the `Token` table. All the data in the column will be lost.
  - Added the required column `hash` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localName` to the `Token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Token` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Token" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hash" TEXT NOT NULL,
    "localName" TEXT NOT NULL,
    "usagesAmount" INTEGER NOT NULL,
    "usagesLeft" INTEGER NOT NULL,
    "activeUntill" DATETIME NOT NULL,
    "maxAmount" REAL NOT NULL,
    "tokenStatus" INTEGER NOT NULL,
    "ownerId" INTEGER NOT NULL,
    CONSTRAINT "Token_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Token" ("activeUntill", "id", "maxAmount", "tokenStatus", "usagesAmount", "usagesLeft") SELECT "activeUntill", "id", "maxAmount", "tokenStatus", "usagesAmount", "usagesLeft" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE UNIQUE INDEX "Token_hash_key" ON "Token"("hash");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
