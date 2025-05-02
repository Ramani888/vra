import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  background-color: #f2f2f2;
`;

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const Tr = styled.tr`
  /* &:nth-child(even) {
    background-color: #f9f9f9;
  }

  &:hover {
    background-color: #ddd;
  } */
`;

export const ColspanTd = styled(Td)`
  text-align: left;
`;

export const Header = styled.h2`
  text-align: center;
`;

export const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
`;
