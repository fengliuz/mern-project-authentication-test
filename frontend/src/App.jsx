import { Route, Routes } from "react-router"
import LoginPage from "./pages/LoginPage"


function App() {
  return(
    <div className="" data-theme="forest">
    <Routes>
      <Route path="/" element={<LoginPage/>}></Route>
    </Routes>
    </div>
  )
}

export default App
