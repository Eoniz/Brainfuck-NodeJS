"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const minimist = require('minimist');
const fs = require('fs');
const path = require('path');
const compiler_1 = require("./compiler");
const interpreter_1 = require("./interpreter");
const argv = minimist(process.argv.slice(2));
if (!argv['input']) {
    throw new Error('No input file given.');
}
try {
    const data = fs.readFileSync(path.join(process.env.PWD, argv['input']), 'utf8');
    const compiler = new compiler_1.default(data);
    const interpreter = new interpreter_1.default(compiler.instructions);
    interpreter.run();
}
catch (e) {
    throw e;
}
