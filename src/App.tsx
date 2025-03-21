import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <Router basename="/final-portfolio">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
