import { useState } from 'react';
import { InitialReadState, Transition } from './useStateMachine';
import { LockReading } from './LockReading';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function CalibrationReadingPage({
  dispatch,
  state,
}: {
  dispatch: React.Dispatch<Transition>;
  state: InitialReadState;
}) {
  const [reading, setReading] = useState('');

  return (
    <Wrapper>
      <h2>Calibration Reading</h2>
      <p>Take another look at your combination. What does it read now?</p>

      <LockReading
        reading={reading}
        setReading={setReading}
        wheelCount={state.count}
      />

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
        disabled={reading.length !== state.count}
        onClick={() =>
          dispatch({
            type: 'complete-calibration-reading',
            payload: {
              reading,
            },
          })
        }
      >
        Next
      </button>
    </Wrapper>
  );
}
