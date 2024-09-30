-- CreateTable
CREATE TABLE "Appointment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "phone_number" TEXT NOT NULL,
    "exam_type" TEXT NOT NULL,
    "exam_name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME
);
