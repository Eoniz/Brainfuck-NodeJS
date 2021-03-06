"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ALLOWED_CHARS_REG = /[^<>+-.,\[\]]/g;
class Compiler {
    constructor(code) {
        this._raw_code = code;
        this._instructions = Compiler.toInstructions(code);
    }
    get rawCode() {
        return this._raw_code;
    }
    get instructions() {
        return this._instructions;
    }
    static toInstructions(code) {
        const pureCode = code.toLocaleLowerCase().replace(ALLOWED_CHARS_REG, "");
        const pureInstructionsArray = Array.from(pureCode);
        const instructions = [];
        const arrayIndexes = [];
        for (let i = 0; i < pureInstructionsArray.length; i++) {
            const istr = pureInstructionsArray[i];
            switch (istr) {
                case ">":
                    instructions.push({ idx: i, type: "MOVE_RIGHT" });
                    break;
                case "<":
                    instructions.push({ idx: i, type: "MOVE_LEFT" });
                    break;
                case "+":
                    instructions.push({ idx: i, type: "INCREMENT" });
                    break;
                case "-":
                    instructions.push({ idx: i, type: "DECREMENT" });
                    break;
                case ".":
                    instructions.push({ idx: i, type: "PRINT" });
                    break;
                case ",":
                    instructions.push({ idx: i, type: "READ" });
                    break;
                case "[":
                    arrayIndexes.push(i);
                    instructions.push({ idx: i, type: "START_LOOP", endLoopIdx: -1 });
                    break;
                case "]":
                    const startLoopInstrIdx = arrayIndexes[arrayIndexes.length - 1];
                    instructions[startLoopInstrIdx].endLoopIdx = i;
                    instructions.push({ idx: i, type: "END_LOOP", startLoopIdx: startLoopInstrIdx });
                    arrayIndexes.pop();
                    break;
            }
        }
        return instructions;
    }
}
exports.default = Compiler;
