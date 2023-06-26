import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./page/homePage";
import OwnerPage from "./page/owner/showHome";
import EditHome from "./page/home/editHome";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/owner" element={<OwnerPage/>}/>
      <Route path="/editHome" element={<EditHome/>}/>
    </Routes>
  );
}

export default App;
