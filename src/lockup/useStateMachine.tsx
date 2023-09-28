// State machine (with history):
// -  welcome state
//      v ()
// -> config state
//      v (wheels: string, count: number)
// -> initial reading state
//      v (reading: string)
// -> calibration instruction state
//      v ()
// -> calibration reading state
//      v (reading: string)
// -> calibration complete state
//      v
// -> instruction state [index]
//      v ...
// -> instruction state [index]
//      v
// -> self-assess state
//      v (treatAsDryRun: boolean)
// -> complete state

import { CALIBRATION_INSTRUCTION } from './const';

// Fixme: Confusions to fix:
// count is used as the number of wheels, and also the number of rotations.
// wheel[s] is used as both the index of the wheel, and also the string of the wheel

export interface Instruction {
  wheel: number;
  up: boolean;
  count: number;
}

export interface Calibration {
  flipUp: boolean;
  flipLeft: boolean;
}

export interface WelcomeState {
  stage: 'welcome' | 'config';
  firstTry: boolean;
}

export interface ConfiguredState {
  stage: 'initial-reading';
  firstTry: boolean;
  instructionsPerWheel: number;
  wheels: string;
  count: number;
  instructions: Instruction[];
}

export interface InitialReadState {
  stage: 'calibration-instruction' | 'calibration-reading';
  firstTry: boolean;
  instructionsPerWheel: number;
  wheels: string;
  count: number;
  instructions: Instruction[];
  initialReading: string;
}

export interface CalibrationCompleteState {
  stage: 'calibration-complete' | 'instruction' | 'self-assess';
  firstTry: boolean;
  instructionsPerWheel: number;
  wheels: string;
  count: number;
  instructions: Instruction[];
  initialReading: string;
  calibration: Calibration;
  instructionIndex: number;
}

export interface CompleteState {
  stage: 'complete';
  firstTry: boolean;
  instructionsPerWheel: number;
  wheels: string;
  count: number;
  instructions: Instruction[];
  initialReading: string;
  calibration: Calibration;
  instructionIndex: number;
  treatAsDryRun: boolean;
}

export type State =
  | WelcomeState
  | ConfiguredState
  | InitialReadState
  | CalibrationCompleteState
  | CompleteState;

export type Transition =
  | {
      type: 'complete-welcome';
    }
  | {
      type: 'complete-config';
      payload: {
        wheels: string;
        instructionsPerWheel: number;
        count: number;
      };
    }
  | {
      type: 'complete-initial-reading';
      payload: {
        reading: string;
      };
    }
  | {
      type: 'complete-calibration-instruction';
    }
  | {
      type: 'complete-calibration-reading';
      payload: {
        reading: string;
      };
    }
  | {
      type: 'complete-calibration-complete';
    }
  | {
      type: 'complete-instruction';
    }
  | {
      type: 'complete-self-assessment';
      payload: {
        treatAsDryRun: boolean;
      };
    };

function randomInstructions(
  instructionsPerWheel: number,
  count: number,
  wheels: string
): Instruction[] {
  const instructions: Instruction[] = [];
  const wheelInstructions: Instruction[][] = [];

  for (let i = 0; i < count; i++) {
    wheelInstructions[i] = [];
    for (let j = 0; j < instructionsPerWheel; j++) {
      wheelInstructions[i].push({
        wheel: i,
        up: Math.random() < 0.5,
        count: 1 + Math.floor(Math.random() * (wheels.length / 2)),
      });
    }
  }

  let lastWheel: string | null = null;
  let keysRemaining = Object.keys(wheelInstructions).filter(
    (x: any) => wheelInstructions[x].length > 0
  );
  while (true) {
    keysRemaining = Object.keys(wheelInstructions).filter(
      (x: any) => wheelInstructions[x].length > 0
    );
    if (keysRemaining.length === 0) {
      break;
    }
    const preferredKeys: string[] = keysRemaining.filter(
      (x) => x !== lastWheel
    );
    const key: string =
      preferredKeys[Math.floor(Math.random() * preferredKeys.length)] ||
      lastWheel!;
    lastWheel = key;
    instructions.push(wheelInstructions[key as any].shift()!);
  }

  return instructions;
}

function calibrateInstruction(
  instruction: Instruction,
  count: number,
  calibration: Calibration
): Instruction {
  return {
    wheel: calibration.flipLeft
      ? count - 1 - instruction.wheel
      : instruction.wheel,
    up: calibration.flipUp ? !instruction.up : instruction.up,
    count: instruction.count,
  };
}

export function rotate(char: string, wheel: string, offset: number): string {
  const i = wheel.indexOf(char);
  const j = (i + (offset % wheel.length) + wheel.length) % wheel.length;
  return wheel[j];
}

export function apply(
  initialReading: string,
  wheel: string,
  instruction: Instruction,
  calibration: Calibration
): string {
  const calibratedInstruction = calibrateInstruction(
    instruction,
    initialReading.length,
    calibration
  );

  const chars = initialReading.split('');
  chars[calibratedInstruction.wheel] = rotate(
    chars[calibratedInstruction.wheel],
    wheel,
    (calibratedInstruction.up ? 1 : -1) * calibratedInstruction.count
  );
  return chars.join('');
}

export function applyN(
  initialReading: string,
  wheel: string,
  instructions: Instruction[],
  calibration: Calibration
): string {
  let reading = initialReading;
  for (const instruction of instructions) {
    reading = apply(reading, wheel, instruction, calibration);
  }
  return reading;
}

export function solveCalibration(
  initialReading: string,
  wheel: string,
  calibrationReading: string,
  instruction: Instruction
): Calibration {
  const FF = {
    flipUp: false,
    flipLeft: false,
  };
  const FT = {
    flipUp: false,
    flipLeft: true,
  };
  const TF = {
    flipUp: true,
    flipLeft: false,
  };
  const TT = {
    flipUp: true,
    flipLeft: true,
  };

  const tryFF =
    calibrationReading === apply(initialReading, wheel, instruction, FF);
  const tryFT =
    calibrationReading === apply(initialReading, wheel, instruction, FT);
  const tryTF =
    calibrationReading === apply(initialReading, wheel, instruction, TF);
  const tryTT =
    calibrationReading === apply(initialReading, wheel, instruction, TT);

  const sum = (a: number, b: number) => a + b;

  const matchingCount = [tryFF, tryFT, tryTF, tryTT]
    .map((bool) => (bool ? 1 : 0))
    .reduce(sum, 0);

  if (matchingCount === 0) {
    throw new Error(
      'Calibration failed: no calibration matched the calibration reading'
    );
  }

  if (matchingCount > 1) {
    throw new Error(
      'Calibration failed: no calibration matched the calibration reading'
    );
  }

  if (tryFF) {
    return FF;
  }

  if (tryFT) {
    return FT;
  }

  if (tryTF) {
    return TF;
  }

  if (tryTT) {
    return TT;
  }

  throw new Error('Calibration failed: impossible to reach this line');
}

export function reducer(state: State, action: Transition): State {
  switch (action.type) {
    case 'complete-welcome': {
      if (state.stage !== 'welcome') {
        throw new Error('Invalid state');
      }
      return {
        ...state,
        stage: 'config',
      };
    }

    case 'complete-config': {
      if (state.stage !== 'config') {
        throw new Error('Invalid state');
      }
      return {
        ...state,
        stage: 'initial-reading',
        instructionsPerWheel: action.payload.instructionsPerWheel,
        wheels: action.payload.wheels,
        count: action.payload.count,
        instructions: randomInstructions(
          action.payload.instructionsPerWheel,
          action.payload.count,
          action.payload.wheels
        ),
      };
    }

    case 'complete-initial-reading': {
      if (state.stage !== 'initial-reading') {
        throw new Error('Invalid state');
      }
      return {
        ...state,
        stage: 'calibration-instruction',
        initialReading: action.payload.reading,
      };
    }

    case 'complete-calibration-instruction': {
      if (state.stage !== 'calibration-instruction') {
        throw new Error('Invalid state');
      }
      return {
        ...state,
        stage: 'calibration-reading',
      };
    }

    case 'complete-calibration-reading': {
      if (state.stage !== 'calibration-reading') {
        throw new Error('Invalid state');
      }
      return {
        ...state,
        stage: 'calibration-complete',
        instructionIndex: 0,
        calibration: solveCalibration(
          state.initialReading,
          state.wheels,
          action.payload.reading,
          CALIBRATION_INSTRUCTION
        ),
      };
    }

    case 'complete-calibration-complete': {
      if (state.stage !== 'calibration-complete') {
        throw new Error('Invalid state');
      }
      return {
        ...state,
        stage: 'instruction',
      };
    }

    case 'complete-instruction': {
      if (state.stage !== 'instruction') {
        throw new Error('Invalid state');
      }
      if (state.instructionIndex === state.instructions.length - 1) {
        return { ...state, stage: 'self-assess' };
      } else {
        return {
          ...state,
          instructionIndex: state.instructionIndex + 1,
        };
      }
    }

    case 'complete-self-assessment': {
      if (state.stage !== 'self-assess') {
        throw new Error('Invalid state');
      }
      return {
        ...state,
        stage: 'complete',
        treatAsDryRun: action.payload.treatAsDryRun,
      };
    }
  }
}
