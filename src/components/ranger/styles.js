import styled from 'styled-components';

export const Track = styled('div')`
  display: inline-block;
  height: 8px;
  width: 90%;
  margin: 0 5%;
`;

export const Segment = styled('div')`
  background: ${(props) =>
    props.index === 0
      ? '#cdcdcd'
      : props.index === 1
      ? '#292929'
      : props.index === 2
      ? '#cdcdcd'
      : '#000000'};
  height: 100%;
`;

export const Handle = styled('div')`
  background: #1f1f1f;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 100%;
  font-size: 0.7rem;
  white-space: nowrap;
  color: white;
  font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
  transform: ${(props) =>
    props.active ? 'translateY(-100%) scale(1.3)' : 'translateY(0) scale(0.9)'};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;
