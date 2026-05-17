import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const assetsDir =
  'C:\\Users\\Shivam Attri\\.cursor\\projects\\c-Users-Shivam-Attri-Desktop-seoshivam-pro\\assets';
const outDir = path.join(root, 'public', 'work');

const sources = [
  {
    file: 'c__Users_Shivam_Attri_AppData_Roaming_Cursor_User_workspaceStorage_bb447228b61a94df3636f03fe8340cbc_images_113shots_so-14ae7b5f-2a49-49e9-aaf6-9d4103b536f1.png',
    out: 'jmj-creations.webp',
  },
  {
    file: 'c__Users_Shivam_Attri_AppData_Roaming_Cursor_User_workspaceStorage_bb447228b61a94df3636f03fe8340cbc_images_whitestone-eea3ce20-fa2b-47c1-99ba-eb3d111c3a37.png',
    out: 'hotel-white-stone.webp',
  },
  {
    file: 'c__Users_Shivam_Attri_AppData_Roaming_Cursor_User_workspaceStorage_bb447228b61a94df3636f03fe8340cbc_images_462_1x_shots_so-aa33dadf-8e60-4e70-8698-c62418c81873.png',
    out: 'connectio.webp',
  },
  {
    file: 'c__Users_Shivam_Attri_AppData_Roaming_Cursor_User_workspaceStorage_bb447228b61a94df3636f03fe8340cbc_images_image-a8eaade4-9181-4791-905d-526b9982a797.png',
    out: 'av-production.webp',
  },
];

await mkdir(outDir, { recursive: true });

const meta = {};

for (const { file, out } of sources) {
  const input = path.join(assetsDir, file);
  const dest = path.join(outDir, out);
  const info = await sharp(input)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(dest);
  meta[out] = { width: info.width, height: info.height, bytes: info.size };
  console.log(`${out}: ${info.width}x${info.height} ${(info.size / 1024).toFixed(1)} KB`);
}

console.log(JSON.stringify(meta, null, 2));
