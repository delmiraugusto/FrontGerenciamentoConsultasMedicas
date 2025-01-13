import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  background: "var(--branco-primario)",
  text: "var(--branco-primario)",
  text2: "var(--preto-primario)",
  h1Background: "var(--verde-secundario)",
  sideBarBackground: "var(--branco-primario)",
  sideBarMobileBackground: "var(--branco)",
  button: "var(--verde-terciario)",
  div: "var(--branco-primario)",
  header: "var(--verde-terciario)",
  hover: "var(--preto-primario)",
  perfil: "var(--verde-terciario)",
  hoverSideBar: "var(--verde-secundario)",
  butaoVoltar: "var(--cinza-primario)",
};

export const darkTheme = {
  background: "var(--cinza-secundario)",
  text: "var(--branco-primario)",
  text2: "var(--branco-primario)",
  h1Background: "var(--preto-primario)",
  sideBarBackground: "var(--preto-primario)",
  sideBarMobileBackground: "var(--preto-primario)",
  button: "var(--preto-primario)",
  div: "var(--cinza-secundario)",
  header: "var(--preto-primario)",
  hover: "rgb(20, 23, 26, 1)",
  perfil: "var(--branco-primario)",
  hoverSideBar: "var(--cinza-secundario)",
  butaoVoltar: "var(--branco-primario)",
};

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.2s ease;
  }

  h1 {
    background-color: ${({ theme }) => theme.h1Background};
    color: ${({ theme }) => theme.text};
    padding: 10px;
    border-radius: 5px;
    transition: all 0.2s ease;
  }

  button {
    background-color: ${({ theme }) => theme.button};
    color: ${({ theme }) => theme.text};
    padding: 10px;
    border-radius: 5px;
    transition: all 0.2s ease;
    &:hover{
      background-color: ${({ theme }) => theme.hover};
    }
  }

  div {
    background-color: ${({ theme }) => theme.div};
    color: ${({ theme }) => theme.text2};
    transition: all 0.2s ease;
  }

  header {
    background-color: ${({ theme }) => theme.header};
    color: ${({ theme }) => theme.text};
    transition: all 0.2s ease;
  }

`;