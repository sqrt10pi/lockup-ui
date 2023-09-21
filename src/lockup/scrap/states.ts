// interface LockConfig {
//   count: number;
//   usedCount: number;
//   wheels: string;
// }

// interface Instruction {
//   wheel: number;
//   up: boolean;
//   count: number;
// }

// interface Orientation {
//   firstReversed: boolean;
//   upReversed: boolean;
// }

// interface InitialState {
//   state: 'initial';
//   firstTime: boolean;
// }

// interface WithConfig {
//   state: 'with-config';
//   firstTime: boolean;
//   lockConfig: LockConfig;
// }

// interface WithInitialCode {
//   state: 'with-initial-code';
//   firstTime: boolean;
//   lockConfig: LockConfig;
//   initialCode: string;
// }

// interface WithOrientation {
//   state: 'with-orientation';
//   firstTime: boolean;
//   lockConfig: LockConfig;
//   initialCode: string;
//   orientation: Orientation;
// }

// interface WithInstructions {
//   state: 'with-instructions';
//   firstTime: boolean;
//   lockConfig: LockConfig;
//   initialCode: string;
//   orientation: Orientation;
//   instructions: Instruction[];
//   currentInstruction: number;
// }

// type State =
//   | InitialState
//   | WithConfig
//   | WithInitialCode
//   | WithOrientation
//   | WithInstructions;
