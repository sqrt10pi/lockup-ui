import { Instruction } from './Instruction';
import { CALIBRATION_INSTRUCTION } from './const';
import { Transition } from './useStateMachine';

export function CalibrationInstructionPage({
  dispatch,
}: {
  dispatch: React.Dispatch<Transition>;
}) {
  return (
    <div>
      <p>
        Now hold your lock however you plan to during the instructions and
        follow this instruction while not looking at the lock itself:
      </p>
      <Instruction instruction={CALIBRATION_INSTRUCTION} />
      <button
        onClick={() => dispatch({ type: 'complete-calibration-instruction' })}
      >
        Next
      </button>
    </div>
  );
}
