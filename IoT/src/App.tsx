import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar.tsx'
import Dashboard from './components/Dashboard.tsx'
import { isExpired } from "react-jwt";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)
    const b = fetch("http://localhost:3100/api/data/latest",
        {method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': ' application/json',
                'x-auth-token': localStorage.getItem('token')
            }})
    console.log(b);
  return (
      <BrowserRouter>
          <Navbar />
    <Routes>

        <Route path="path" element={isExpired(localStorage.getItem('token')) ? <Navigate replace to="/"/> : <Dashboard
        />}/>
    </Routes>
      </BrowserRouter>
  )
}

export default App
