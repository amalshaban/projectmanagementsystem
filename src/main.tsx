import { StrictMode} from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AuthContextProvider from './Modules/Authontication/Components/Context/AuthContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </StrictMode>,
)
