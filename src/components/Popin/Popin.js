import React from 'react';
import styled from 'styled-components';

const PopinElement = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: ${(props) => (props.open ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const PopinBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
`;

const PopinContent = styled.div`
  z-index: 2;
  width: 80vw;
  padding: 2em;
  background: #fff;
  border-radius: 15px;
`;

function Popin({ isOpen, toggle, children }) {
  return (
    <PopinElement open={isOpen}>
      <PopinBackground onClick={toggle} />
      <PopinContent>{children}</PopinContent>
    </PopinElement>
  );
}

export default Popin;
