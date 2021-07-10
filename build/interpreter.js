"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Interpreter {
    constructor(instructions) {
        this._instructions = instructions;
        this.init();
    }
    init() {
        this._array = [];
        this._ptr = 0;
        this._instructionPtr = 0;
        for (let i = 0; i < Interpreter.ARRAY_LENGTH; i++) {
            this._array[i] = 0;
        }
        this._stdout = [];
    }
    run() {
        this.init();
        this.executeNext();
        console.log(`stdout: ${String.fromCharCode(...this._stdout)}`);
    }
    executeNext() {
        if (this._instructions[this._instructionPtr] === undefined) {
            return;
        }
        const currentInstruction = this._instructions[this._instructionPtr];
        const nextInstructionPtr = this.execute(currentInstruction, this._instructionPtr);
        this._instructionPtr = nextInstructionPtr;
        this.executeNext();
    }
    execute(instruction, instructionPtr) {
        let nextInstructionPos = instructionPtr + 1;
        switch (instruction.type) {
            case "START_LOOP": {
                const byte = this._array[this._ptr];
                if (byte === 0) {
                    nextInstructionPos = instruction.endLoopIdx + 1;
                    break;
                }
                break;
            }
            case "END_LOOP": {
                const byte = this._array[this._ptr];
                if (byte !== 0) {
                    nextInstructionPos = instruction.startLoopIdx + 1;
                    break;
                }
                break;
            }
            case "MOVE_LEFT":
                this._ptr -= 1;
                break;
            case "MOVE_RIGHT":
                this._ptr += 1;
                break;
            case "PRINT":
                console.log(this._array[this._ptr]);
                this._stdout.push(this._array[this._ptr]);
                break;
            case "READ":
                break;
            case "INCREMENT":
                this._array[this._ptr] += 1;
                break;
            case "DECREMENT":
                this._array[this._ptr] -= 1;
                break;
        }
        return nextInstructionPos;
    }
}
Interpreter.ARRAY_LENGTH = 30000;
exports.default = Interpreter;
