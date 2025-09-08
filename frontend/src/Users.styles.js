
import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const Thead = styled.thead`
  background-color: #16213e;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid #0f3460;
`;

export const Th = styled.th`
  padding: 15px;
  text-align: left;
  color: #e94560;
`;

export const Td = styled.td`
  padding: 15px;
`;

export const Button = styled.button`
  background-color: #0f3460;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1a4a8a;
  }

  &.delete {
    background-color: #e94560;

    &:hover {
        background-color: #f06a7f;
    }
  }
`;

export const AddButton = styled(Button)`
    background-color: #0f3460;
    margin-bottom: 20px;
`;
