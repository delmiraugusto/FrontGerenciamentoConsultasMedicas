import 'bootstrap/dist/css/bootstrap.min.css';
import ToastifyAlert from './Components/Toastify';
import AppRoutes from './routes/AppRoutes';
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { useContext } from 'react';
import { darkTheme, GlobalStyle, lightTheme } from './styles/themes';
import { ThemeContext } from './context/themeContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <BrowserRouter>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyle />
        <AuthProvider>
          <ToastifyAlert />
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
