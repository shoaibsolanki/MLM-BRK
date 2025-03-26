import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SnackbarProvider } from 'notistack'
import { AuthProvider } from './contexts/AuthConext.jsx'
import { CartProvider } from './contexts/CartContext.jsx'
import { BrowserRouter as Router,  } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackbarProvider autoHideDuration={2000} preventDuplicate>
    <Router>

      <AuthProvider>
      <CartProvider>
    <App />
    </CartProvider>
    </AuthProvider>
    </Router>

    </SnackbarProvider>
  </StrictMode>,
)
