import { Transition, WelcomeState } from './useStateMachine';

export function WelcomePage({
  dispatch,
  state,
}: {
  dispatch: React.Dispatch<Transition>;
  state: WelcomeState;
}) {
  return (
    <div>
      <h2>Welcome</h2>
      <p>
        This app will help you to set your combination lock to a code that you
        don't know but the computer does. Remember that safety is the most
        important thing when doing any type of play, so take your time to make
        sure that you follow the instructions carefully. There are no time
        limits.
      </p>

      {state.firstTry ? (
        <p>
          This looks like your first try on this computer, so the code will be
          revealed to you at the end.{' '}
          <strong>
            Complete the process successfully at least once to unlock real
            lockups.
          </strong>
        </p>
      ) : (
        <p>
          You have done a dry run successfully before, so this site can now help
          you with real lockups.
        </p>
      )}

      <button onClick={() => dispatch({ type: 'complete-welcome' })}>
        Next
      </button>
    </div>
  );
}
