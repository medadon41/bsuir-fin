/*
  Warnings:

  - You are about to drop the column `confirmation` on the `Token` table. All the data in the column will be lost.
  - Added the required column `confirmation` to the `Transaction` table without a default value. This is not possible if the table is not empty.

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
INSERT INTO "new_Token" ("activeUntill", "hash", "id", "localName", "maxAmount", "ownerId", "tokenStatus", "usagesAmount", "usagesLeft") SELECT "activeUntill", "hash", "id", "localName", "maxAmount", "ownerId", "tokenStatus", "usagesAmount", "usagesLeft" FROM "Token";
DROP TABLE "Token";
ALTER TABLE "new_Token" RENAME TO "Token";
CREATE UNIQUE INDEX "Token_hash_key" ON "Token"("hash");
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" INTEGER NOT NULL DEFAULT 0,
    "senderId" INTEGER NOT NULL,
    "senderAccount" TEXT NOT NULL,
    "receiverAccount" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "time" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "confirmation" INTEGER NOT NULL,
    CONSTRAINT "Transaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "id", "receiverAccount", "senderAccount", "senderId", "time", "type") SELECT "amount", "id", "receiverAccount", "senderAccount", "senderId", "time", "type" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
