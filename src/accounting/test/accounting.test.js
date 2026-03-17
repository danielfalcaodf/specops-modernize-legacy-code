const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const APP_DIR = path.resolve(__dirname, '..');

function runApp(scriptedInput) {
  const result = spawnSync(process.execPath, ['index.js'], {
    cwd: APP_DIR,
    input: scriptedInput,
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, `Expected exit code 0, got ${result.status}. stderr: ${result.stderr}`);
  return result.stdout;
}

function assertMenuShown(output) {
  assert.match(output, /Account Management System/);
  assert.match(output, /1\. View Balance/);
  assert.match(output, /2\. Credit Account/);
  assert.match(output, /3\. Debit Account/);
  assert.match(output, /4\. Exit/);
  assert.match(output, /Enter your choice \(1-4\):/);
}

test('TC-001: starts with default balance 1000.00', () => {
  const output = runApp('1\n4\n');
  assert.match(output, /Current balance: 1000\.00/);
});

test('TC-002: displays full main menu on startup', () => {
  const output = runApp('4\n');
  assertMenuShown(output);
});

test('TC-003: rejects invalid menu selection and returns to menu', () => {
  const output = runApp('5\n4\n');
  assert.match(output, /Invalid choice\. Please enter a number from 1 to 4\./);

  const menuCount = (output.match(/Account Management System/g) || []).length;
  assert.ok(menuCount >= 2, 'Expected menu to be shown again after invalid choice.');
});

test('TC-004: view balance reads current stored value after credit', () => {
  const output = runApp('2\n25.50\n1\n4\n');
  assert.match(output, /Amount credited\. New balance: 1025\.50/);
  assert.match(output, /Current balance: 1025\.50/);
});

test('TC-005: credit updates balance and confirms new value', () => {
  const output = runApp('2\n200.00\n4\n');
  assert.match(output, /Enter credit amount:/);
  assert.match(output, /Amount credited\. New balance: 1200\.00/);
});

test('TC-006: credit accepts two decimal places', () => {
  const output = runApp('2\n12.34\n1\n4\n');
  assert.match(output, /Amount credited\. New balance: 1012\.34/);
  assert.match(output, /Current balance: 1012\.34/);
});

test('TC-007: returns to menu after successful credit', () => {
  const output = runApp('2\n10.00\n4\n');
  assert.match(output, /Amount credited\. New balance: 1010\.00/);

  const menuCount = (output.match(/Account Management System/g) || []).length;
  assert.ok(menuCount >= 2, 'Expected menu to be shown again after credit.');
});

test('TC-008: debit with sufficient funds updates balance', () => {
  const output = runApp('3\n200.00\n4\n');
  assert.match(output, /Enter debit amount:/);
  assert.match(output, /Amount debited\. New balance: 800\.00/);
});

test('TC-009: debit equal to current balance is allowed', () => {
  const output = runApp('3\n1000.00\n1\n4\n');
  assert.match(output, /Amount debited\. New balance: 0\.00/);
  assert.match(output, /Current balance: 0\.00/);
});

test('TC-010: debit above current balance is rejected', () => {
  const output = runApp('3\n1000.01\n4\n');
  assert.match(output, /Insufficient funds for this debit\./);
});

test('TC-011: balance remains unchanged after insufficient-funds debit', () => {
  const output = runApp('3\n1500.00\n1\n4\n');
  assert.match(output, /Insufficient funds for this debit\./);
  assert.match(output, /Current balance: 1000\.00/);
});

test('TC-012: returns to menu after insufficient-funds debit', () => {
  const output = runApp('3\n1500.00\n4\n');
  assert.match(output, /Insufficient funds for this debit\./);

  const menuCount = (output.match(/Account Management System/g) || []).length;
  assert.ok(menuCount >= 2, 'Expected menu to be shown again after insufficient-funds debit.');
});

test('TC-013: multiple operations in one session share stored balance', () => {
  const output = runApp('2\n100.00\n3\n40.00\n1\n4\n');
  assert.match(output, /Amount credited\. New balance: 1100\.00/);
  assert.match(output, /Amount debited\. New balance: 1060\.00/);
  assert.match(output, /Current balance: 1060\.00/);
});

test('TC-014: exit ends loop and shows goodbye message', () => {
  const output = runApp('4\n');
  assert.match(output, /Exiting the program\. Goodbye!/);
});

test('TC-015: balance resets to default on restart', () => {
  const firstRun = runApp('2\n250.00\n4\n');
  assert.match(firstRun, /Amount credited\. New balance: 1250\.00/);

  const secondRun = runApp('1\n4\n');
  assert.match(secondRun, /Current balance: 1000\.00/);
});

test('TC-016: valid choices follow documented interaction flow', () => {
  const output = runApp('1\n2\n10.00\n3\n5.00\n4\n');
  assert.match(output, /Current balance: 1000\.00/);
  assert.match(output, /Amount credited\. New balance: 1010\.00/);
  assert.match(output, /Amount debited\. New balance: 1005\.00/);
  assert.match(output, /Exiting the program\. Goodbye!/);
});
