import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;
  background-color: ${({ theme }) => theme.div};

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const DivLogin = styled.div`
  max-width: 350px;
`;


export const Imagem = styled.img`
  display: none;

  @media (min-width: 768px) {
    display: flex;
  }
  `;

export const Logo = styled.img`
display: none;
width: 13rem;
align-self: center;

@media (max-width: 768px) {
  display: flex;
}
`;

export const Titulo = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  color: ${({ theme }) => theme.text2};
`;

export const Forme = styled.form`
  margin-top: 5rem;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  @media (min-width: 768px) {
    width: 30rem;
  }
`;

export const AccessibilityContainer = styled.div`
  position: fixed;
  right: 1rem;
  top: 100px;
  display: flex;
  flex-direction: column;
`;

export const Accessibility = styled.button`
  background: transparent;
  border: none;
  flex-direction: column;
  cursor: pointer;
  color:  ${({ theme }) => theme.text2};
  
  &:hover {
    color: #01A998;
    background: transparent;
  }
`;


export const TogglePasswordButton = styled.button`
  background: #f8f9fa;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #585859;

  &:hover {
    color: #0D0D0D;
  }

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonEntrar = styled.button`
  background: ${({ theme }) => theme.button};
  border: none;
  font-weight: bold;
  align-self: center;
  width: 18rem;
  height: 2.7rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 8px #3d3d3d;

  &:hover {
    background: #3d3d3d;
  }
`;

export const TextoEntrar = styled.p`
  color: ${({ theme }) => theme.text};
  margin-top: 0.1rem
  `;

export const TextoCadastro = styled.p`
  color: ${({ theme }) => theme.text};
  align-self: center;
`;

export const TextoClique = styled.p`
cursor: pointer;
  color: blue;
  text-decoration: none;
  margin-left: 12rem;
  margin-bottom: 1rem;

  &:hover {
    color: darkblue;
    text-decoration: underline;
  }
`;
