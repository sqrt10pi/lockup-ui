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
