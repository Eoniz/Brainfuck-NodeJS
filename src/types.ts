export type InstructionType = (
    "MOVE_LEFT"
    | "MOVE_RIGHT"
    | "INCREMENT"
    | "DECREMENT"
    | "PRINT"
    | "READ"
    | "START_LOOP"
    | "END_LOOP"
);

export type RawInstruction = {
    idx: number;
    type: InstructionType
}

export type StartLoopInstruction = RawInstruction & {
    type: "START_LOOP",
    endLoopIdx: number;
}

export type EndLoopInstruction = RawInstruction & {
    type: "END_LOOP",
    startLoopIdx: number;
}

export type Instruction = (
    RawInstruction
    | EndLoopInstruction
    | StartLoopInstruction
);
