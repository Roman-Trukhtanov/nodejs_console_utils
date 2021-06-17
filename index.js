#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const Commands = {
    CURRENT: 'current',
    ADD: 'add',
    SUB: 'sub',
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const argvCommands = argv._;

class NodeDate {
    constructor() {
        this.currentDate = new Date();
        this.year = this.currentDate.getFullYear();
        this.month = this.currentDate.getMonth();
        this.day = this.currentDate.getDate();
        this.hours = this.currentDate.getHours();
        this.minutes = this.currentDate.getMinutes();
        this.seconds = this.currentDate.getSeconds();
    }
    init() {
        if (!argvCommands.length) {
            console.log('use: current | add | sub');
            return;
        }

        argvCommands.forEach(command => {
            switch (command) {
                case Commands.CURRENT: this.getCurrent();
                    break;
                case Commands.ADD: this.add();
                    break;
                case Commands.SUB: this.sub();
                    break;    
                default:
                    break;    
            }
        });
    }
    checkYear() {
        return argv.year || argv.y;
    }
    checkMonth() {
        return argv.month || argv.m;
    }
    checkDate() {
        return argv.date || argv.d;
    }
    getIsoDate(
        year = this.year,
        month = this.month,
        day = this.day,
        hours = this.hours,
        minutes = this.minutes,
        seconds = this.seconds,
    ) {
        return new Date(year, month, day, hours, minutes, seconds).toISOString();
    }
    getCurrent() {
        let current = this.currentDate;

        if (this.checkYear()) {
            current = this.year;
        } else if (this.checkMonth()) {
            current = MONTHS[this.month], `(${this.month + 1})`;
        } else if (this.checkDate()) {
            current = this.day;
        }

        console.log(current);
        return current;
    }
    add() {
        let year = this.year, month = this.month, date = this.day;

        if (this.checkYear()) {
            year = this.year + (argv.year || argv.y || 0);
        }
        if (this.checkMonth()) {
            month = this.month + (argv.month || argv.m || 0);
        } 
        if (this.checkDate()) {
            date = this.day + (argv.date || argv.d || 0);
        }

        const isoDate = this.getIsoDate(year, month, date); 
        console.log(isoDate);
        return isoDate;
    }
    sub() {
        let year = this.year, month = this.month, date = this.day;

        if (this.checkYear()) {
            year = this.year - (argv.year || argv.y || 0);
        }
        if (this.checkMonth()) {
            month = this.month - (argv.month || argv.m || 0);
        } 
        if (this.checkDate()) {
            date = this.day - (argv.date || argv.d) || 0;
        }

        const isoDate = this.getIsoDate(year, month, date); 
        console.log(isoDate);
        return isoDate;
    }
}

const nodeDate = new NodeDate();
nodeDate.init();