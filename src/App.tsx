import "./App.css";
import ListContact from "./pages/ContactList";
import { Routes, Route } from "react-router-dom";
import AddContact from "./pages/AddContact";
import EditContact from "./pages/EditContact";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ListContact />}></Route>
        <Route path="/add" element={<AddContact />}></Route>
        <Route path="/contact/:id" element={<EditContact />}></Route>
      </Routes>
    </div>
  );
}

export default App;
