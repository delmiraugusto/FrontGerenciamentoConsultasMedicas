import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #f8f9fa;
    padding: 20px;
    gap: 20px;
    height: 100vh;
`;

export const Column = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border: 1px solid #dee2e6;
    border-radius: 10px;
    padding: 20px;
    overflow-y: auto;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Button = styled.button`
    margin-top: 10px;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s ease;
    width: 100%;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        cursor: not-allowed;
        background-color: #d3d3d3;
    }
`;

export const ButtonModal = styled.button`
    margin-top: 10px;
    width: 10rem;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

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
    z-index: 1001;
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.772);
    z-index: 1000; 
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

export const Label = styled.label`
    font-size: 14px;
    color: #343a40;
    margin-bottom: 5px;
    display: block;
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 20px;
`;

export const EditButton = styled(Button)`
    background-color: #ffca2c;
    color: black;
    width: 10rem;
    &:hover {
        background-color: #e0a800;
    }
`;

export const SaveButton = styled(Button)`
    background-color: #28a745;
    color: white;
    &:hover {
        background-color: #218838;
    }
`;

export const CancelButton = styled(Button)`
    background-color: #fa5a54;
    color: white;
    &:hover {
        background-color: #e03a3a;
    }
`;

export const EmptyMessage = styled.p`
    text-align: center;
    color: #6c757d;
    font-size: 16px;
    margin-top: 20px;
`;
