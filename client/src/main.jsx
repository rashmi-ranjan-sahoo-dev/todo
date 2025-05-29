import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthPrvider } from './components/Authentication/context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthPrvider>
    <App />
    </AuthPrvider>
  </StrictMode>
)
