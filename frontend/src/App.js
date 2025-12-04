import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateClient from "./pages/CreateClient";
import CreateCase from "./pages/CreateCase";
import CaseList from "./pages/CaseList";
import CaseDetail from "./pages/CaseDetail";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CaseList />} />
        <Route path="/create-client" element={<CreateClient />} />
        <Route path="/create-case" element={<CreateCase />} />
        <Route path="/case/:id" element={<CaseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
