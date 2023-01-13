import React from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../context';
function SidebarRow({ Icon, title }) {
  const { isSidebarOpen } = useGlobalContext();
  return (
    <Container show={isSidebarOpen} className='row'>
      <Icon />
      <div>{title}</div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.show ? 'column' : 'row')};
  align-items: center;
  padding: 10px 20px;
  margin-right: 5px;
  gap: ${(props) => (props.show ? '5px' : '20px')};
  cursor: pointer;
  color: black;
  font-size: ${(props) => (props.show ? '12px' : '20px')};
  font-weight: ${(props) => (props.show ? '300' : '500')};
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  svg {
    font-size: 25px;
  }
  &:hover {
    background-color: lightgray;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
`;
export default SidebarRow;
