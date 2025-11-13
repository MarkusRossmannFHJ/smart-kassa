import { BrowserRouter as Router, Routes, Route } from "react-router";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ModeToggle } from "./components/ModdleToggle";
import Login from "./pages/Login";

/**
 * The Routes are all declared here
 * @returns Router Component for Routing in the Application without reloading whole page
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <footer className="fixed bottom-3 right-2">
        <ModeToggle />
      </footer>
    </Router>
  );
}

export default App;
