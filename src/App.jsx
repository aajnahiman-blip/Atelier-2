import { BrowserRouter, Routes, Route } from "react-router-dom";
import MembersList from "./components/MembersList";
import MemberForm from "./components/MemberForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MembersList />} />
        <Route path="/add" element={<MemberForm />} />
        <Route path="/edit/:id" element={<MemberForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;