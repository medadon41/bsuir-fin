-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creditId" INTEGER,
    "borrowerId" INTEGER NOT NULL,
    "dateStarted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateExpire" DATETIME NOT NULL,
    "dateLastCharged" DATETIME,
    "isRepaid" BOOLEAN NOT NULL DEFAULT false,
    "amount" REAL NOT NULL,
    "amountRepaid" REAL NOT NULL,
    CONSTRAINT "Loan_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Loan_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Loan" ("amount", "amountRepaid", "borrowerId", "creditId", "dateExpire", "dateLastCharged", "dateStarted", "id", "isRepaid") SELECT "amount", "amountRepaid", "borrowerId", "creditId", "dateExpire", "dateLastCharged", "dateStarted", "id", "isRepaid" FROM "Loan";
DROP TABLE "Loan";
ALTER TABLE "new_Loan" RENAME TO "Loan";
CREATE TABLE "new_CreditTicket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creditId" INTEGER,
    "senderId" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,
    "managerId" INTEGER,
    "amount" REAL NOT NULL,
    "years" REAL NOT NULL DEFAULT 0,
    "comment" TEXT NOT NULL DEFAULT '',
    CONSTRAINT "CreditTicket_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CreditTicket_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CreditTicket_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "StaffMember" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_CreditTicket" ("amount", "comment", "creditId", "id", "managerId", "senderId", "status", "years") SELECT "amount", "comment", "creditId", "id", "managerId", "senderId", "status", "years" FROM "CreditTicket";
DROP TABLE "CreditTicket";
ALTER TABLE "new_CreditTicket" RENAME TO "CreditTicket";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
