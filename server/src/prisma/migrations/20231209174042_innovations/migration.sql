-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Credit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "receiverAccount" TEXT NOT NULL,
    "minAmount" REAL NOT NULL,
    "maxAmount" REAL NOT NULL,
    "percent" REAL NOT NULL
);
INSERT INTO "new_Credit" ("receiverAccount", "id", "maxAmount", "minAmount", "percent", "title") SELECT "receiverAccount", "id", "maxAmount", "minAmount", "percent", "title" FROM "Credit";
DROP TABLE "Credit";
ALTER TABLE "new_Credit" RENAME TO "Credit";
CREATE TABLE "new_CreditTicket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creditId" INTEGER NOT NULL,
    "senderId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "managerId" INTEGER,
    "amount" REAL NOT NULL,
    "comment" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "CreditTicket_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CreditTicket_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CreditTicket_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "StuffMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CreditTicket" ("amount", "creditId", "id", "managerId", "senderId", "status") SELECT "amount", "creditId", "id", "managerId", "senderId", "status" FROM "CreditTicket";
DROP TABLE "CreditTicket";
ALTER TABLE "new_CreditTicket" RENAME TO "CreditTicket";
CREATE TABLE "new_Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" INTEGER NOT NULL DEFAULT 0,
    "senderId" INTEGER NOT NULL,
    "senderAccount" TEXT NOT NULL,
    "receiverAccount" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    CONSTRAINT "Transaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("amount", "id", "receiverAccount", "senderAccount", "senderId") SELECT "amount", "id", "receiverAccount", "senderAccount", "senderId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "is2faEnabled" BOOLEAN NOT NULL,
    "mainBalance" INTEGER NOT NULL DEFAULT 0,
    "publicId" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_User" ("birthDate", "email", "id", "is2faEnabled", "mainBalance", "middleName", "name", "password", "surname") SELECT "birthDate", "email", "id", "is2faEnabled", "mainBalance", "middleName", "name", "password", "surname" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
