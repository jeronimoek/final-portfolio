import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Me from "./pages/Me";
import Stack from "./pages/Stack";
import RootLayout from "./layouts/RootLayout";
import Projects from "./pages/Projects";

function App() {
  return (
    // <Router basename="/final-portfolio">
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" index element={<Me />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/projects" element={<Projects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
