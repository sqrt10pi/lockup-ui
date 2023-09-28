import { Transition } from './useStateMachine';

export function SelfAssessPage({
  dispatch,
}: {
  dispatch: React.Dispatch<Transition>;
}) {
  return (
    <div>
      <h2>Self Assessment</h2>
      <p>
        You're almost done. How confident are you that you followed instructions
        perfectly?
      </p>
      <div>
        <button
          onClick={() =>
            dispatch({
              type: 'complete-self-assessment',
              payload: {
                treatAsDryRun: true,
              },
            })
          }
        >
          I may have made a mistake
        </button>{' '}
        <button
          onClick={() =>
            dispatch({
              type: 'complete-self-assessment',
              payload: {
                treatAsDryRun: false,
              },
            })
          }
        >
          I followed instructions perfectly
        </button>
      </div>
    </div>
  );
}
