import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthContextProvider } from './contexts/AuthContext';

window.AUTH_SERVER_URL = 'http://localhost:3000';
window.API_SERVER_URL = 'http://localhost:4000';

const theme = createTheme({
	palette: {
		mode: 'dark'
	}
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<ThemeProvider theme={theme}>
		<AuthContextProvider>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</AuthContextProvider>
	</ThemeProvider>
);