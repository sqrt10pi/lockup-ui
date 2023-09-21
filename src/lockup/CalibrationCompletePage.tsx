import { Transition } from './useStateMachine';

export function CalibrationCompletePage({
  dispatch,
}: {
  dispatch: React.Dispatch<Transition>;
}) {
  return (
    <div>
      <h2>Calibration completed</h2>
      <button
        onClick={() => dispatch({ type: 'complete-calibration-complete' })}
      >
        Next
      </button>
    </div>
  );
}
