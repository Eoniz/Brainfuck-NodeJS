const minimist = require('minimist');
const fs = require('fs');
const path = require('path');

import Compiler from './compiler';
import Interpreter from './interpreter';

const argv = minimist(process.argv.slice(2));
if (!argv['input']) {
    throw new Error('No input file given.');
}

try {
    const data = fs.readFileSync(path.join(process.env.PWD, argv['input']), 'utf8');
    const compiler = new Compiler(data);
    const interpreter = new Interpreter(compiler.instructions);
    interpreter.run();
} catch (e) {
    throw e;
}
