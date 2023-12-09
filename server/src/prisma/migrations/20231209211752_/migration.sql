/*
  Warnings:

  - You are about to drop the `StuffMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StuffMember";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "StaffMember" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CreditTicket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creditId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "managerId" INTEGER,
    "amount" REAL NOT NULL,
    "years" REAL NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "CreditTicket_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CreditTicket_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CreditTicket_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "StaffMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CreditTicket" ("amount", "comment", "creditId", "id", "managerId", "senderId", "status", "years") SELECT "amount", "comment", "creditId", "id", "managerId", "senderId", "status", "years" FROM "CreditTicket";
DROP TABLE "CreditTicket";
ALTER TABLE "new_CreditTicket" RENAME TO "CreditTicket";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
