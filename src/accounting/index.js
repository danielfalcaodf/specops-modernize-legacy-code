const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const DEFAULT_BALANCE_CENTS = 100000;
const MAX_BALANCE_CENTS = 99999999;
const MENU_CHOICES = new Set(['1', '2', '3', '4']);

function formatCurrency(cents) {
  return (cents / 100).toFixed(2);
}

function parseAmountToCents(rawValue) {
  const normalizedValue = rawValue.trim();

  if (!/^\d{1,6}(?:\.\d{1,2})?$/.test(normalizedValue)) {
    return null;
  }

  const [integerPart, decimalPart = ''] = normalizedValue.split('.');
  const paddedDecimalPart = (decimalPart + '00').slice(0, 2);
  const cents = Number(integerPart) * 100 + Number(paddedDecimalPart);

  if (!Number.isSafeInteger(cents) || cents > MAX_BALANCE_CENTS) {
    return null;
  }

  return cents;
}

class InputSource {
  constructor() {
    this.rl = input.isTTY ? readline.createInterface({ input, output }) : null;
    this.bufferPromise = null;
    this.bufferedLines = [];
    this.currentLineIndex = 0;
  }

  async question(prompt) {
    if (this.rl) {
      return this.rl.question(prompt);
    }

    if (!this.bufferPromise) {
      this.bufferPromise = new Promise((resolve, reject) => {
        let data = '';

        input.setEncoding('utf8');
        input.on('data', (chunk) => {
          data += chunk;
        });
        input.on('end', () => {
          resolve(data.split(/\r?\n/));
        });
        input.on('error', reject);
      });
    }

    if (this.bufferedLines.length === 0) {
      this.bufferedLines = await this.bufferPromise;
    }

    output.write(prompt);

    if (this.currentLineIndex >= this.bufferedLines.length) {
      output.write('\n');
      throw new Error('Input stream ended unexpectedly.');
    }

    const value = this.bufferedLines[this.currentLineIndex];
    this.currentLineIndex += 1;
    output.write(`${value}\n`);
    return value;
  }

  close() {
    if (this.rl) {
      this.rl.close();
    }
  }
}

class DataProgram {
  constructor() {
    this.storageBalanceCents = DEFAULT_BALANCE_CENTS;
  }

  read() {
    return this.storageBalanceCents;
  }

  write(balanceCents) {
    if (!Number.isSafeInteger(balanceCents) || balanceCents < 0 || balanceCents > MAX_BALANCE_CENTS) {
      throw new Error('Balance out of range.');
    }

    this.storageBalanceCents = balanceCents;
  }
}

class Operations {
  constructor(dataProgram, inputSource) {
    this.dataProgram = dataProgram;
    this.inputSource = inputSource;
  }

  async execute(operationType) {
    if (operationType === 'TOTAL ') {
      this.viewBalance();
      return;
    }

    if (operationType === 'CREDIT') {
      await this.creditAccount();
      return;
    }

    if (operationType === 'DEBIT ') {
      await this.debitAccount();
    }
  }

  viewBalance() {
    const finalBalanceCents = this.dataProgram.read();
    output.write(`Current balance: ${formatCurrency(finalBalanceCents)}\n`);
  }

  async creditAccount() {
    const amountCents = await this.promptForAmount('Enter credit amount: ');

    if (amountCents === null) {
      output.write('Invalid amount.\n');
      return;
    }

    const finalBalanceCents = this.dataProgram.read() + amountCents;

    if (finalBalanceCents > MAX_BALANCE_CENTS) {
      output.write('Invalid amount.\n');
      return;
    }

    this.dataProgram.write(finalBalanceCents);
    output.write(`Amount credited. New balance: ${formatCurrency(finalBalanceCents)}\n`);
  }

  async debitAccount() {
    const amountCents = await this.promptForAmount('Enter debit amount: ');

    if (amountCents === null) {
      output.write('Invalid amount.\n');
      return;
    }

    const finalBalanceCents = this.dataProgram.read();

    if (finalBalanceCents >= amountCents) {
      const updatedBalanceCents = finalBalanceCents - amountCents;
      this.dataProgram.write(updatedBalanceCents);
      output.write(`Amount debited. New balance: ${formatCurrency(updatedBalanceCents)}\n`);
      return;
    }

    output.write('Insufficient funds for this debit.\n');
  }

  async promptForAmount(prompt) {
    const rawValue = await this.inputSource.question(prompt);
    return parseAmountToCents(rawValue);
  }
}

class MainProgram {
  constructor() {
    this.continueFlag = 'YES';
    this.inputSource = new InputSource();
    this.operations = new Operations(new DataProgram(), this.inputSource);
  }

  async run() {
    try {
      while (this.continueFlag === 'YES') {
        this.displayMenu();
        const userChoice = (await this.inputSource.question('Enter your choice (1-4): ')).trim();
        await this.handleChoice(userChoice);
      }

      output.write('Exiting the program. Goodbye!\n');
    } finally {
      this.inputSource.close();
    }
  }

  displayMenu() {
    output.write('Account Management System\n');
    output.write('1. View Balance\n');
    output.write('2. Credit Account\n');
    output.write('3. Debit Account\n');
    output.write('4. Exit\n');
  }

  async handleChoice(userChoice) {
    if (!MENU_CHOICES.has(userChoice)) {
      output.write('Invalid choice. Please enter a number from 1 to 4.\n');
      return;
    }

    if (userChoice === '1') {
      await this.operations.execute('TOTAL ');
      return;
    }

    if (userChoice === '2') {
      await this.operations.execute('CREDIT');
      return;
    }

    if (userChoice === '3') {
      await this.operations.execute('DEBIT ');
      return;
    }

    this.continueFlag = 'NO';
  }
}

async function main() {
  const program = new MainProgram();
  await program.run();
}

main().catch((error) => {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
});