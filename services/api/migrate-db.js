const { execSync } = require('child_process');
const { randomUUID } = require('crypto');
const { resolve } = require('path');
const { parse } = require('dotenv');
const {
  readFileSync,
  existsSync,
  writeFileSync,
  renameSync,
  rmSync,
} = require('fs');
const { promisify } = require('util');

const envPath = resolve(__dirname, '.env');
const tempEnvPath = resolve(__dirname, randomUUID().slice(0, 6));

if (!existsSync(envPath)) writeFileSync(envPath, '');

const envContent = readFileSync(envPath, 'utf-8');
const envObject = parse(envContent);

renameSync(envPath, tempEnvPath);

const lib = {};

// Saves the original file
function main() {
  console.group(`Executing file ${__filename}`);
  envObject.DATABASE_URL = process.env.DATABASE_URL;

  const string = Object.entries(envObject)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  writeFileSync(envPath, string);

  console.log('migrating db...');

  try {
    execSync(`pnpm prisma migrate  dev --name=${Math.random() + ''}`);
  } catch (error) {
    console.error(`prisma migration failed: ${error.message}`);
  }

  rmSync(envPath);
  renameSync(tempEnvPath, envPath);
  console.group(`Execution file done ${__filename}`);
}

main();
