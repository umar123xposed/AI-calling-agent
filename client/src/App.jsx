import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CallManagement from "./pages/CallManagement";
import Transcripts from "./pages/Transcripts";
import { CallProvider } from "./context/CallContext";

function App() {
  return (
    <CallProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/call-management" element={<CallManagement />} />
          <Route path="/transcripts" element={<Transcripts />} />
        </Routes>
      </Router>
    </CallProvider>
  );
}

export default App;
