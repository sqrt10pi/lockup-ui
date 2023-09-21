import { Transition } from './useStateMachine';

export function WelcomePage({
  dispatch,
}: {
  dispatch: React.Dispatch<Transition>;
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
      <button onClick={() => dispatch({ type: 'complete-welcome' })}>
        Next
      </button>
    </div>
  );
}
