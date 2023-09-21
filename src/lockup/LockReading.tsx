import { useState } from 'react';
import styled from 'styled-components';

// from https://dev.to/madsstoumann/using-a-single-input-for-one-time-code-352l
const Input = styled.input<{
  ['data-digits']: number;
  ['data-current-digit']: number;
}>`
  --otp-ls: 2ch;
  --otp-gap: 1.25;

  /* private consts */
  --_otp-bgsz: calc(var(--otp-ls) + 1ch);

  all: unset;
  background: linear-gradient(
      90deg,
      var(--otp-bg, #bbb) calc(var(--otp-gap) * var(--otp-ls)),
      transparent 0
    ),
    linear-gradient(
      90deg,
      var(--otp-bg, #eee) calc(var(--otp-gap) * var(--otp-ls)),
      transparent 0
    );
  background-position: calc(
        ${(props) => props['data-current-digit']} * var(--_otp-bgsz)
      )
      0,
    0 0;
  background-repeat: no-repeat, repeat-x;
  background-size: var(--_otp-bgsz) 100%;
  caret-color: var(--otp-cc, #222);
  caret-shape: block;
  clip-path: inset(0% calc(var(--otp-ls) / 2) 0% 0%);
  font-family: ui-monospace, monospace;
  font-size: var(--otp-fz, 2.5em);
  inline-size: calc(${(props) => props['data-digits']} * var(--_otp-bgsz));
  letter-spacing: var(--otp-ls);
  padding-block: var(--otp-pb, 1ch);
  padding-inline-start: calc(((var(--otp-ls) - 1ch) / 2) * var(--otp-gap));

  color: black;
  text-align: left;
  margin-right: -1ch;
  margin-bottom: 0.5em;
`;

interface Props {
  reading: string;
  setReading: (value: string) => void;
  wheelCount: number;
}

export function LockReading({ reading, setReading, wheelCount }: Props) {
  const [selectionIndex, setSelectionIndex] = useState(0);

  return (
    <Input
      autoFocus
      type="text"
      value={reading}
      onChange={(e) => {
        setSelectionIndex(e.target.selectionStart ?? 0);
        setReading(e.target.value);
      }}
      maxLength={wheelCount}
      data-digits={wheelCount}
      data-current-digit={selectionIndex}
    />
  );
}
