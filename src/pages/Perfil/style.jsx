import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 6.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const BlockedInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f2f2f2;
  cursor: not-allowed;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Option = styled.option``;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 0.8rem 2rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s;

  &.back {
    background-color: #3d3d3d;
    color: white;
    &:hover {
      background-color: #2b2b2b;
    }
  }

  &.edit {
    background-color: #ffc107;
    color: black;
    &:hover {
      background-color: #e0a800;
    }
  }

  &.delete {
    background-color: #c82333;
    color: white;
    &:hover {
      background-color: #fa5a54;
    }
  }

  &.save {
    background-color: #013d32;
    color: white;
    &:hover {
      background-color: #014d3d;
    }
  }
`;
