import { useDropzone } from 'react-dropzone';
import jsQR from 'jsqr';
import { useState } from 'react';

function channelMask(channel: number, data: ImageData): ImageData {
  const output = new ImageData(
    new Uint8ClampedArray(data.data),
    data.width,
    data.height
  );

  for (var i = 0; i < data.data.length; i += 4) {
    const v = data.data[i + channel];

    output.data[i] = v;
    output.data[i + 1] = v;
    output.data[i + 2] = v;
    output.data[i + 3] = 255;
  }

  return output;
}

async function findQrCodes(
  file: File
): Promise<{ simple: null | string; advanced: null | any }> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = document.createElement('img');
    img.src = url;
    img.onload = () => {
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d')!;
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);

      var myData = context.getImageData(0, 0, img.width, img.height);

      const red = channelMask(0, myData);
      const blue = channelMask(2, myData);

      const redDecode = jsQR(red.data, myData.width, myData.height);
      const blueDecode = jsQR(blue.data, myData.width, myData.height);

      const advanced = redDecode?.data.startsWith('state:')
        ? JSON.parse(redDecode!.data.replace('state:', ''))
        : null;

      const simple = blueDecode?.data.startsWith('code:')
        ? blueDecode!.data.replace('code:', '')
        : null;

      resolve({ advanced, simple });
    };
  });
}

const Pending = Symbol('pending');

interface FileResult {
  filename: string;
  simple: typeof Pending | null | string;
  advanced: typeof Pending | null | any;
}

export function useQrDecoder() {
  const [files, setFiles] = useState<FileResult[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop(files) {
      for (const file of files) {
        findQrCodes(file).then((result) => {
          setFiles((files) => [
            ...files,
            {
              filename: file.name,
              simple: result.simple,
              advanced: result.advanced,
            },
          ]);
        });
      }
    },
  });

  return { files, getRootProps, getInputProps };
}
