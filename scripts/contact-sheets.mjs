import fs from "node:fs/promises";
import sharp from "sharp";

for (const kind of ["reference", "pocketmc"]) {
  const dir = `.ai/screenshots/${kind}`;
  for (const width of [1440, 390]) {
    const files = (await fs.readdir(dir)).filter(
      (file) =>
        file.startsWith(`${width}-`) &&
        file.endsWith(".png") &&
        !file.includes("contact-sheet"),
    );
    if (!files.length) continue;
    const cells = [];
    const cellWidth = width === 1440 ? 360 : 195;
    const cellHeight = width === 1440 ? 275 : 500;
    const cols = width === 1440 ? 4 : 6;
    for (let i = 0; i < files.length; i++) {
      const meta = await sharp(`${dir}/${files[i]}`).metadata();
      cells.push({
        input: await sharp(`${dir}/${files[i]}`)
          .extract({
            left: 0,
            top: 0,
            width,
            height: Math.min(width === 1440 ? 1100 : 1000, meta.height),
          })
          .resize(cellWidth, cellHeight, {
            fit: "contain",
            background: "#171717",
          })
          .png()
          .toBuffer(),
        left: (i % cols) * cellWidth,
        top: Math.floor(i / cols) * (cellHeight + 25),
      });
      const label = Buffer.from(
        `<svg width="${cellWidth}" height="25"><rect width="100%" height="25" fill="#222"/><text x="8" y="17" fill="white" font-family="Arial" font-size="10">${files[i]}</text></svg>`,
      );
      cells.push({
        input: label,
        left: (i % cols) * cellWidth,
        top: Math.floor(i / cols) * (cellHeight + 25) + cellHeight,
      });
    }
    await sharp({
      create: {
        width: cellWidth * cols,
        height: Math.ceil(files.length / cols) * (cellHeight + 25),
        channels: 3,
        background: "#171717",
      },
    })
      .composite(cells)
      .png()
      .toFile(`${dir}/${width}-contact-sheet.png`);
  }
}
