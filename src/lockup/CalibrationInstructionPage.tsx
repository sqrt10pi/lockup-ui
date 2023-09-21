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
      <Instruction instruction={CALIBRATION_INSTRUCTION} />
      <button
        onClick={() => dispatch({ type: 'complete-calibration-instruction' })}
      >
        Next
      </button>
    </div>
  );
}
