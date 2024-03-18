import {BrowserRouter , Routes , Route} from "react-router-dom";

import Home from "./pages/Home";
import UsersPage from "./pages/UsersPage";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/users" element={<UsersPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
