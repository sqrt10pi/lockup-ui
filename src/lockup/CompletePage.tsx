import { useMemo } from 'react';
import { CALIBRATION_INSTRUCTION } from './const';
import { applyN, CompleteState } from './useStateMachine';
// @ts-expect-error untyped
import QRious from 'qrious';

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

  return (
    <div>
      Your final code is {finalCode}
      <br />
      <a href={dataUrl} download="combo.png">
        Download
      </a>
    </div>
  );
}
