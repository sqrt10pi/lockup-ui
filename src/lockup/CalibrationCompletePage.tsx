import { Transition } from './useStateMachine';

export function CalibrationCompletePage({
  dispatch,
}: {
  dispatch: React.Dispatch<Transition>;
}) {
  return (
    <div>
      <h2>Calibration completed</h2>

      <p>
        It's OK if you realized that you rotated the last wheel instead, or you
        rotated the wheel down instead of up. The important part is that you
        changed it in a way that felt intuitive to you when you read the
        instructions. As long as you continue to orient the lock the same way
        you did in the previous step, this app will keep track of the correct
        combination for you.
      </p>

      <p>
        If you want to orient the lock differently, reload the page and start
        over.
      </p>
      
      <button
        onClick={() => dispatch({ type: 'complete-calibration-complete' })}
      >
        Next
      </button>
    </div>
  );
}
