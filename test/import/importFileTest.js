'use strict';

const assert = require('assert');
const fs = require('fs');

// Functions tested
const importFile = require('../../bin/import-tools/importFile');
const { insertFile, db } = require('../../bin/import-tools/insertFile');

// Create fake chargeService function
// This is to ensure that tests on functions are independent
// If used chargeService function, these tests would not be independent
const fakeCharge = [
  {
    amount: 500,
    date: '2019-08-02T21:59:08+00:00',
    name: 'Salesforce CRM',
    description: 'Annual renewal for company licenses.',
    type: 'AP'
  }
];

const createFakeFile = (charge, file) => {
  if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp');
  }
  fs.writeFileSync(`${__dirname}/../../temp/${file}`, JSON.stringify(charge));
};

// Start tests
describe('Import File to Database', () => {
  describe('importFile', () => {
    it('should read content from charge file', () => {
      createFakeFile(fakeCharge, 'chargesTest.json');
      const charges = importFile('chargesTest.json');
      assert.equal(charges.length, 1);
    });

    it('should FAIL if charge file is empty', () => {
      createFakeFile([], 'emptyTest.json');
      const charges = importFile('emptyTest.json');
      assert.equal(charges, 'ERROR: The file appears to be empty');
    });

    it('should FAIL if it cannot find file', () => {
      const charges = importFile('testNoFile.json');
      assert.equal(charges, 'ERROR: We could not find file');
    });
  });

  describe('insertFile', () => {
    before(async () => {
      await db.none('DELETE FROM test_charges');
    });

    after(async () => {
      await db.none('DELETE FROM test_charges');
    });

    it('should insert data to database', async () => {
      const res = await insertFile(fakeCharge, 'test_charges');
      const row = await db.any('SELECT * FROM test_charges');
      assert.equal(res, 'Your data has been uploaded to the database!');
      assert.equal(row.length, 1);
    });
  });
});
