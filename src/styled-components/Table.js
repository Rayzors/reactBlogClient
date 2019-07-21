import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 15px;
  padding: 2em;

  th {
    color: #000;
  }

  th,
  td {
    padding: 15px;
    text-align: left;
  }

  tr {
    border-bottom: 1px solid rgba(120, 193, 234, 0.15);
  }

  tbody tr:last-child {
    border: 0;
  }
`;
