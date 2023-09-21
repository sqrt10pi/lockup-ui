import { Instruction as InstructionType } from './useStateMachine';

function getOrdinal(n: number) {
  let ord = 'th';

  if (n % 10 == 1 && n % 100 != 11) {
    ord = 'st';
  } else if (n % 10 == 2 && n % 100 != 12) {
    ord = 'nd';
  } else if (n % 10 == 3 && n % 100 != 13) {
    ord = 'rd';
  }

  return ord;
}

export function Instruction({ instruction }: { instruction: InstructionType }) {
  return (
    <p>
      Rotate the{' '}
      <b>
        {instruction.wheel + 1}
        {getOrdinal(instruction.wheel + 1)}
      </b>{' '}
      wheel{' '}
      <b style={{ color: instruction.up ? 'lightblue' : 'lightpink' }}>
        {instruction.up ? 'up' : 'down'}
      </b>{' '}
      by <b>{instruction.count} clicks</b>
    </p>
  );
}
