import { ReactNode } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NavLink, To } from 'react-router-dom';

export const BigButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const BigNavButtonWrapper = styled(NavLink)`
  flex-basis: 200px;
  flex-shrink: 0;
  flex-grow: 0;

  color: white;
  border: 1px solid grey;

  .title {
    font-size: x-large;
  }
  .icon {
    font-size: 3em;
  }
  .contents {
    font-size: small;
  }
`;

interface BigNavButtonProps {
  title: string;
  icon: IconProp;
  children: ReactNode;
  to: To;
}

export function BigNavButton({ title, children, icon, to }: BigNavButtonProps) {
  return (
    <BigNavButtonWrapper to={to}>
      <div className="title">{title}</div>
      <div className="icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="contents">{children}</div>
    </BigNavButtonWrapper>
  );
}
