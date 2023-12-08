/*
  Warnings:

  - You are about to drop the column `receiver` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `sender` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `receiverAccount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderAccount` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "senderId" INTEGER NOT NULL,
    "senderAccount" TEXT NOT NULL,
    "receiverAccount" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    CONSTRAINT "Transaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "id") SELECT "amount", "id" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
