import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Me from "./pages/Me";
import Stack from "./pages/Stack";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <Router basename="/final-portfolio">
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" index element={<Me />} />
          <Route path="/stack" element={<Stack />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
