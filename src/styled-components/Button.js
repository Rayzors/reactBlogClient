import styled from 'styled-components';

export const Button = styled.button`
  background: #fff;
  color: #78c1ea;
  border: 0;
  border-radius: 50px;
  padding: 1em 2em;
  margin-bottom: 1em;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0px 4px 20px rgba(120, 193, 234, 0.15);

  &:hover {
    color: #fff;
    background: #78c1ea;
  }

  &:focus {
    outline: none;
  }
`;
