import { Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/landing/HomePage";
import { Route } from "react-router-dom";

function App() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<HomePage />} />;
    </Routes>
  );
}

export default App;
