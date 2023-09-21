import { Transition } from './useStateMachine';

export function SelfAssessPage({
  dispatch,
}: {
  dispatch: React.Dispatch<Transition>;
}) {
  return (
    <div>
      <h2>Final Review</h2>
      <p>
        You're almost done. Ask yourself if you were able to follow all
        instructions perfectly.
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
          I did not make any mistakes
        </button>
      </div>
    </div>
  );
}
