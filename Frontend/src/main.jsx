import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import CommonContext from './Components/Dashboard/Form/Utils/Context/CommonContext.jsx'

createRoot(document.getElementById('root')).render(
   <GoogleOAuthProvider clientId="384732871188-kufjkrt0rc3jfvjbkc78vdupcsntnt5q.apps.googleusercontent.com">
      <BrowserRouter>
         <CommonContext>
            <App />
         </CommonContext>
      </BrowserRouter>
   </GoogleOAuthProvider>
)
