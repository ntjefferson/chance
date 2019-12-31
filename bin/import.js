#!/usr/bin/env node

const program = require("commander");
const logger = require("../api/helpers/logger");

// Import Functions
const importFile = require('./import-tools/importFile');
const insertFile = require('./import-tools/insertFile');

program
  .option("-f, --filename <required>", "filename required")
  .version("1.1.0")
  .parse(process.argv);

process.on("uncaughtException", err => {
  logger.error("Unexpected Error", err);
  process.exit(1);
});

const chargeFile = program.filename;

// Set up import process
const runImport = async(file) => {
  console.log(`Importing and reading ${file}...`)
  let data = importFile(file);
  console.log(`Data has been imported, inserting into database...`)
  await insertFile(data);
  process.exit(0)
}

runImport(chargeFile)

