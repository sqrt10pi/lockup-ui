import { Instruction } from './Instruction';
import { Transition, CalibrationCompleteState } from './useStateMachine';

export function InstructionPage({
  dispatch,
  state,
}: {
  dispatch: React.Dispatch<Transition>;
  state: CalibrationCompleteState;
}) {
  return (
    <div>
      <h2>Instruction {state.instructionIndex + 1}</h2>
      <Instruction instruction={state.instructions[state.instructionIndex]} />
      <button onClick={() => dispatch({ type: 'complete-instruction' })}>
        Next
      </button>
    </div>
  );
}
