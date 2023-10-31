import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ListContact from "./pages/ContactList";
import { Routes, Route, useNavigate } from "react-router-dom";
import AddContact from "./pages/AddContact";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListContact />}></Route>
        <Route path="/add" element={<AddContact />}></Route>
      </Routes>
    </div>
  );
}

export default App;
