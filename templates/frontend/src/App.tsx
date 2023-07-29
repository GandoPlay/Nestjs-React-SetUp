
import { Hello } from './components/Admin/Hello'
import { SignUp } from './components/Auth/SignUp'
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
        <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/hello" element={<Hello />} />
    </Routes>


    
    </>
  )
}

export default App
