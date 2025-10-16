-- CreateTable
CREATE TABLE "Countdown" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'early-access',
    "endAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
