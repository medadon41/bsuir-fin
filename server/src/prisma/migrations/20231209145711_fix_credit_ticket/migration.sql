/*
  Warnings:

  - Added the required column `managerId` to the `CreditTicket` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreditTicket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creditId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "managerId" INTEGER NOT NULL,
    "amount" REAL NOT NULL,
    CONSTRAINT "CreditTicket_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CreditTicket_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CreditTicket_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "StuffMember" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CreditTicket" ("amount", "creditId", "id", "senderId", "status") SELECT "amount", "creditId", "id", "senderId", "status" FROM "CreditTicket";
DROP TABLE "CreditTicket";
ALTER TABLE "new_CreditTicket" RENAME TO "CreditTicket";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
