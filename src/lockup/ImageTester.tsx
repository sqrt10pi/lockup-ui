import styled from 'styled-components';
import { useQrDecoder } from './useQrDecoder';
import { ReactNode, useEffect } from 'react';

const DropWrapper = styled.div`
  padding: 8px;
  border: 1px solid white;
  color: grey;
  margin-bottom: 8px;
`;

export const ImageTester = ({
  children,
  onSuccessfulScan = () => {},
}: {
  children: ReactNode;
  onSuccessfulScan?: () => void;
}) => {
  const { files, getRootProps, getInputProps } = useQrDecoder();

  useEffect(() => {
    if (files.some((file) => !!file.advanced && !!file.simple)) {
      onSuccessfulScan();
    }
  }, [files]);

  return (
    <div>
      <DropWrapper {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {children}
        {files.map((file) => {
          return (
            <p key={file.filename}>
              <b>{file.filename}: </b>
              {!!file.advanced && !!file.simple ? (
                <span style={{ color: 'green' }}>Readable</span>
              ) : (
                <span style={{ color: 'red' }}>ERROR</span>
              )}
            </p>
          );
        })}
      </DropWrapper>
    </div>
  );
};
