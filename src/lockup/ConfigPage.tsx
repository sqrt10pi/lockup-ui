import { useState } from 'react';
import { Transition } from './useStateMachine';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 100px;
  grid-gap: 1em;
  margin-bottom: 0.5em;
  text-align: left;
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
  const [instructionsPerWheel, setInstructionsPerWheel] = useState('3');

  return (
    <div>
      <h2>Lock Details</h2>
      <p>First we need to know a little bit about your lock.</p>
      <Form>
        <label htmlFor="wheelCount">How many digits are on your lock?</label>
        <input
          style={{ width: 100 }}
          type="number"
          id="wheelCount"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <label htmlFor="instructionsPerWheel">
          How many instructions do you want per digit?
        </label>
        <select
          style={{ width: 100 }}
          id="instructionsPerWheel"
          value={instructionsPerWheel}
          onChange={(e) => setInstructionsPerWheel(e.target.value)}
        >
          <option value="3">3 - Easy</option>
          <option value="4">4 - Medium</option>
          <option value="5">5 - Hard</option>
        </select>

        {/* <label htmlFor="wheelDigits">What are the values on each wheel?</label>
        <input
          type="text"
          id="wheelDigits"
          value={wheels}
          onChange={(e) => setWheels(e.target.value)}
        /> */}
      </Form>
      <p>
        Also, double check that the digits on your locks rotate{' '}
        <code>0, 1, 2, 3, 4, 5, 6, 7, 8, 9</code> in that order.
      </p>
      <button
        disabled={count === ''}
        onClick={() =>
          dispatch({
            type: 'complete-config',
            payload: {
              wheels,
              count: parseInt(count, 10),
              instructionsPerWheel: parseInt(instructionsPerWheel, 10),
            },
          })
        }
      >
        Next
      </button>
    </div>
  );
}
