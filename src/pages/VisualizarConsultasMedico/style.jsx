import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    gap: 20px;
    height: 100vh;
`;

export const Column = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    padding: 20px;
    overflow-y: auto;
`;

export const Header = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: #343a40;
`;

export const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const ListItem = styled.div`
    padding: 15px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

export const Modal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 20px;
    width: 50%; 
    max-width: 600px;
    height: auto; 
    overflow: auto;
`;


export const Input = styled.input`
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    background-color: ${(props) => (props.disabled ? '#e9ecef' : 'white')};
    pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};

    &:disabled:hover {
        cursor: not-allowed;
    }
`;