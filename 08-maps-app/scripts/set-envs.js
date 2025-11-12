const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const mapTileKey = process.env['MAPTILE_KEY'];

if (!mapTileKey) {
  throw new Error('MAPTILE_KEY is not set.');
}

const envFileContent = `
  export const environment = {
    MAPTILE_KEY: "${mapTileKey}"
  };
`;

mkdirSync('./src/environments', { recursive: true });

writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);