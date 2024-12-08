import './App.css'
import {Routes, Route} from 'react-router-dom'
import Main from './components/Main/Main.jsx'
import Login from './components/Login/Login.jsx'
import Register from './components/Registration/Registration.jsx'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/main" element={<Main />}/>
      </Routes>
  )
}

export default App
