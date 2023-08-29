import Header from "./components/Header";
import Cards from "./components/Cards";
import { Route, Routes } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Details from "./components/Details";
import { createContext, useState } from "react";
import Login from './components/Login';
import SignUp from './components/SignUp';

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <Appstate.Provider value={{ login, setLogin, userName, setUserName }}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addMovie" element={<AddMovie />} />
          <Route path="/details/:id" element={<Details />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </Appstate.Provider>
  );
}

export default App;
export { Appstate };
  