import { useState } from 'react';
import { ConfiguredState, Transition } from './useStateMachine';
import { LockReading } from './LockReading';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function InitialReadingPage({
  dispatch,
  state,
}: {
  dispatch: React.Dispatch<Transition>;
  state: ConfiguredState;
}) {
  const [reading, setReading] = useState('');

  return (
    <Wrapper>
      <h2>Initial Reading</h2>
      <p>Take a look at your lock now. What does it read to start?</p>
      <LockReading
        reading={reading}
        setReading={setReading}
        wheelCount={state.count}
      />
      <button
        disabled={reading.length !== state.count}
        onClick={() =>
          dispatch({
            type: 'complete-initial-reading',
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
