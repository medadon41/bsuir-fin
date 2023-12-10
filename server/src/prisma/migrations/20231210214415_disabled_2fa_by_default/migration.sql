-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "middleName" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "is2faEnabled" BOOLEAN NOT NULL DEFAULT false,
    "mainBalance" INTEGER NOT NULL DEFAULT 0,
    "publicId" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_User" ("birthDate", "email", "id", "is2faEnabled", "mainBalance", "middleName", "name", "password", "publicId", "surname") SELECT "birthDate", "email", "id", "is2faEnabled", "mainBalance", "middleName", "name", "password", "publicId", "surname" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
