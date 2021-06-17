#!/usr/bin/env node

const readline = require('readline');

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class GuessNumber {
    constructor() {
        this.rl = readline.createInterface(process.stdin);
        this.guessNumber = randomInt(0, 100);

        this.onLine = this.onLine.bind(this);
    }
    init() {
        console.log('Загадано число в диапазоне от 0 до 100');
        this.addListeners();
    }
    onLine(input) {
        if (this.guessNumber > input) {
            console.log('больше');
        } else if (this.guessNumber < input) {
            console.log('меньше');
        } else {
            this.rl.close();
        }
    }
    addListeners() {
        this.rl.on('line', this.onLine);
        this.rl.on('close', () => console.log(`Наши поздравления!!! (ответ: ${this.guessNumber})`));
    }
}

const guessNumber = new GuessNumber();
guessNumber.init();