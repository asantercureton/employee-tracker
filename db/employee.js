const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Employee {
    constructor() {

    }

    readFile() {
        return readFileAsync('', "UTF8");
    }

    writeFile() {
        return writeFileAsync('', JSON.stringify());
    }
}