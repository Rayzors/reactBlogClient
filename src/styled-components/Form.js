import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 15px;
  padding: 0.5em;
  border: 1px solid rgba(120, 193, 234, 0.15);

  &:focus {
    outline: none;
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  font-size: 16px;
  line-height: 1.5;
  border-radius: 15px;
  padding: 0.5em;
  border: 1px solid rgba(120, 193, 234, 0.15);

  &:focus {
    outline: none;
  }
`;

export const Group = styled.div`
  margin-bottom: 2em;

  label {
    display: block;
    color: #000;
    margin: 0.5em 0 0.2em;
    font-weight: bold;
    font-size: 14px;
  }
`;

export const Button = styled.input`
  background: #fff;
  color: #78c1ea;
  border: 0;
  border-radius: 50px;
  padding: 1em 2em;
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
