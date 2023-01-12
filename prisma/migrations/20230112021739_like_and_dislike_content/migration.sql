-- CreateTable
CREATE TABLE "_Like" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Dislike" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Like_AB_unique" ON "_Like"("A", "B");

-- CreateIndex
CREATE INDEX "_Like_B_index" ON "_Like"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Dislike_AB_unique" ON "_Dislike"("A", "B");

-- CreateIndex
CREATE INDEX "_Dislike_B_index" ON "_Dislike"("B");

-- AddForeignKey
ALTER TABLE "_Like" ADD CONSTRAINT "_Like_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Like" ADD CONSTRAINT "_Like_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Dislike" ADD CONSTRAINT "_Dislike_A_fkey" FOREIGN KEY ("A") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Dislike" ADD CONSTRAINT "_Dislike_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
