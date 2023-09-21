import { useState } from 'react';
import { Transition } from './useStateMachine';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 100px;
  grid-gap: 1em;
  margin-bottom: 0.5em;
`;

export function ConfigPage({
  dispatch,
}: {
  dispatch: React.Dispatch<Transition>;
}) {
  // todo switch to a drop down
  // Actually, do we ever need anything other than the digits?
  const [wheels /*, setWheels*/] = useState('0123456789');

  const [count, setCount] = useState('');

  return (
    <div>
      <h2>Lock Details</h2>
      <p>First we need to know a little bit about your lock.</p>
      <Form>
        <label htmlFor="wheelCount">
          How many wheels or digits are on your lock?
        </label>
        <input
          style={{ width: 100 }}
          type="number"
          id="wheelCount"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        {/* <label htmlFor="wheelDigits">What are the values on each wheel?</label>
        <input
          type="text"
          id="wheelDigits"
          value={wheels}
          onChange={(e) => setWheels(e.target.value)}
        /> */}
      </Form>
      <button
        disabled={count === ''}
        onClick={() =>
          dispatch({
            type: 'complete-config',
            payload: {
              wheels,
              count: parseInt(count, 10),
            },
          })
        }
      >
        Next
      </button>
    </div>
  );
}
