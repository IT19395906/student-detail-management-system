import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Home from "./home";
import GetStudent from "./getStudent";
import AddStudent from "./addStudent";
import UpdateStudent from "./updateStudent";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/get/:id" element={<GetStudent/>}/>
          <Route exact path="/add" element={<AddStudent/>}/>
          <Route exact path="/update/:id" element={<UpdateStudent/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
