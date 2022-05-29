import React, { memo } from 'react';
import styled from 'styled-components';
import { GetValueType, TimeTrackerData } from '../../common/types';
import Span from '../atoms/Span';

interface CardContentProps {
  children?: React.ReactNode;
  content?: GetValueType<TimeTrackerData>;
  onClick?: (
    e: React.MouseEvent<HTMLButtonElement | HTMLDivElement, MouseEvent>
  ) => void;
}

const StyledCardContent = styled.div`
  position: relative;
  ${({ theme }) => theme.common.flexCenter};
  width: 100%;
  height: 100%;
  animation: all 1s ease-in-out;

  &:nth-child(5) {
    grid-column: 3;
  }
`;

const Content = styled.span`
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 105px;
  padding: 0 10px 0 10px;
`;

const CardContent: React.FC<CardContentProps> = ({
  children,
  content,
  onClick,
}) => {
  return (
    <StyledCardContent onClick={onClick}>
      {content && <Content className="content">{content}</Content>}
      {children}
    </StyledCardContent>
  );
};

export default memo(CardContent);
