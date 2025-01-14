import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #aaaaaa;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #013d32;
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 80%;
    max-width: 600px;

    h1 {
        margin-bottom: 20px;
    }

    div {
        display: flex;
        justify-content: space-between;
        gap: 20px;
        width: 100%;
    }

    .logout {
        margin-top: 20px;
        align-self: flex-start;  
    }
`;

export const NavButton = styled.button`
    background-color: white;
    color: #0D0D0D;
    border: 2px solid white;
    border-radius: 4px;
    padding: 8px 15px;  
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 30%; 

    &:hover {
        background-color: #3D3D3D;
        color: white;
    }

    &.logout:hover {
        background-color: #fe4039;
    }
`;
