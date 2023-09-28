import { useEffect, useMemo } from 'react';
import { CALIBRATION_INSTRUCTION } from './const';
import { applyN, CompleteState } from './useStateMachine';
// @ts-expect-error untyped
import QRious from 'qrious';
import { ImageTester } from './ImageTester';
import { clearFirstTry } from './firstTry';

// http://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) {
  const cars = text.split('\n');

  for (const car of cars) {
    let line = '';
    const words = car.split(' ');

    for (const word of words) {
      const testLine = `${line + word} `;
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth) {
        context.fillText(line, x, y);
        line = `${word} `;
        y += lineHeight;
      } else {
        line = testLine;
      }
    }

    context.fillText(line, x, y);
    y += lineHeight;
  }
}

export function CompletePage({ state }: { state: CompleteState }) {
  const finalCode = applyN(
    state.initialReading,
    state.wheels,
    [CALIBRATION_INSTRUCTION, ...state.instructions],
    state.calibration
  );

  const dataUrl = useMemo(() => {
    const canvas = document.createElement('canvas');
    const qrCanvas = document.createElement('canvas');
    const simpleQrCanvas = document.createElement('canvas');

    canvas.width = 500;
    canvas.height = 500;
    qrCanvas.width = 400;
    qrCanvas.height = 400;
    simpleQrCanvas.width = 100;
    simpleQrCanvas.height = 100;

    new QRious({
      element: qrCanvas,
      value: `state:${JSON.stringify({ LOCKUP_UI_VERSION: 1, state })}`,
      size: 400,
      level: 'M',
      foreground: '#0000FF',
      padding: 0,
    });

    new QRious({
      element: simpleQrCanvas,
      value: `code:${finalCode}`,
      size: 100,
      level: 'L',
      foreground: '#FF0000',
      padding: 0,
    });

    const instructionsText = [
      state.initialReading,
      `flipL:${state.calibration.flipLeft ? 1 : 0}`,
      `flipU:${state.calibration.flipUp ? 1 : 0}`,
      ...[CALIBRATION_INSTRUCTION, ...state.instructions].map(
        (instruction) =>
          `${instruction.wheel + 1}${instruction.up ? 'U' : 'D'}${
            instruction.count
          }`
      ),
      finalCode,
    ].join('\n');

    const ctx = canvas.getContext('2d')!;
    // draw background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 500, 500);

    // Write main code
    ctx.fillStyle = 'black';
    ctx.font = '48px serif';
    ctx.fillText(finalCode, 10, 50);

    // write smaller code
    ctx.fillStyle = 'black';
    ctx.font = '16px monospace';
    ctx.fillText(finalCode, 10, 90);

    // write instructions
    wrapText(ctx, instructionsText, 10, 210, 20, 8);

    // write QRs
    ctx.drawImage(qrCanvas, 100, 100);
    ctx.drawImage(simpleQrCanvas, 0, 100);

    return canvas.toDataURL();
  }, [finalCode, state]);

  useEffect(() => {}, []);

  return (
    <div>
      {state.firstTry ? (
        <h1>
          This is your first try, so we're revealing your code regardless of how
          confident you were in your answers. Check now to see if it matches
          your lock. Also test the downloaded image below to get access to real
          lockups. On your next try if you're confident in your abilities then
          you won't see the code.
        </h1>
      ) : null}
      {state.treatAsDryRun || state.firstTry ? (
        <h2>Your final code is {finalCode}</h2>
      ) : (
        <h2>Your final code is in the following image.</h2>
      )}
      <br />
      <a
        href={dataUrl}
        download={`lockup-combo-${new Date().toISOString()}.png`}
      >
        Download Combo Code Image
      </a>
      <div style={{ marginTop: 32 }}>
        <ImageTester
          onSuccessfulScan={() => {
            clearFirstTry();
          }}
        >
          <p>
            Once you download, drag and drop the image here to confirm that it
            generated correctly
          </p>
        </ImageTester>
      </div>
    </div>
  );
}
