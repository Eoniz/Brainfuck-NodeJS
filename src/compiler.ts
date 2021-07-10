import { Instruction, StartLoopInstruction } from "./types";

const ALLOWED_CHARS_REG = /[^<>+-.,\[\]]/g;

class Compiler {
    private _raw_code: string;
    private _instructions: Instruction[];

    constructor (code: string) {
        this._raw_code = code;
        this._instructions = Compiler.toInstructions(code);
    }

    public get rawCode() {
        return this._raw_code;
    }

    public get instructions() {
        return this._instructions;
    }

    private static toInstructions(code: string): Instruction[] {
        const pureCode: string = code.toLocaleLowerCase().replace(ALLOWED_CHARS_REG, "");
        const pureInstructionsArray = Array.from(pureCode);

        const instructions: Instruction[] = [];
        const arrayIndexes: number[] = [];
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
                    (instructions[startLoopInstrIdx] as StartLoopInstruction).endLoopIdx = i;
                    instructions.push({ idx: i, type: "END_LOOP", startLoopIdx: startLoopInstrIdx });
                    arrayIndexes.pop();
                    break;
            }
        }

        return instructions;
    }
}

export default Compiler;
