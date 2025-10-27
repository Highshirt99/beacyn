import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Login from './views/Login'
import Signup from './views/Signup'

export default function App() {
  return (
    <BrowserRouter>
    
      
        <main>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
 
    </BrowserRouter>
  )
}
