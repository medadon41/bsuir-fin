-- CreateTable
CREATE TABLE "Loan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "creditId" INTEGER NOT NULL,
    "borrowerId" INTEGER NOT NULL,
    "dateStarted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateExpire" DATETIME NOT NULL,
    "dateLastCharged" DATETIME,
    "isRepaid" BOOLEAN NOT NULL DEFAULT false,
    "amount" REAL NOT NULL,
    "amountRepaid" REAL NOT NULL,
    CONSTRAINT "Loan_creditId_fkey" FOREIGN KEY ("creditId") REFERENCES "Credit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Loan_borrowerId_fkey" FOREIGN KEY ("borrowerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
