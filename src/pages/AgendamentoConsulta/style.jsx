import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    margin: 100px auto;
    margin-top: 15rem;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h2`
    text-align: center;
    margin-bottom: 20px;
    color: #343a40;
`;

export const InputGroup = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
    color: #495057;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ced4da;
    border-radius: 4px;
    &:focus {
        border-color: #80bdff;
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
`;

export const ErrorText = styled.span`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`;

export const CustomButton = styled.button`
    width: 10rem;
    background-color: #013d32;
    color: white;
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #012720;
    }
`;

export const BackButton = styled.button`
    background-color: #3D3D3D;
    color: white;
    width: 10rem;
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2c2c2c;
    }
`;