import { CalibrationCompleteState, Transition } from './useStateMachine';

export function CalibrationCompletePage({
  dispatch,
}: // state,
{
  dispatch: React.Dispatch<Transition>;
  state: CalibrationCompleteState;
}) {
  return (
    <div>
      <h2>Calibration completed</h2>

      <p>
        We've now learned the way you're holding your lock today. Keep holding
        it the way that you're currently orienting it. Also, <b>keep</b> that
        change that you just made.
      </p>
      {/* <small>
        You don't need to know this, but in case you're curious:
        <ul>
          <li>
            The way you're holding the lock means that when we tell you to
            update the first digit you're actually updating{' '}
            <strong>
              {state.calibration.flipLeft
                ? 'the last digit'
                : 'the first digit'}
            </strong>
            .
          </li>
          <li>
            When we tell you to rotate a digit up that{' '}
            <strong>
              {state.calibration.flipUp ? 'increases' : 'decreases'}
            </strong>{' '}
            the number.
          </li>
        </ul>
      </small> */}

      <button
        onClick={() => dispatch({ type: 'complete-calibration-complete' })}
      >
        Next
      </button>
    </div>
  );
}
