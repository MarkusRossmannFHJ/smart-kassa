import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Component used to redirect to register page if user not loged in on device
 * @param children all Components that should be only accesible if user is loged in
 * @returns
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  //To be able to test the homepage
  const DISABLED = true; // <-- nur hier ändern

  if (DISABLED) {
    return <>{children}</>;
  }

  // Überprüfen, ob der User eingeloggt ist
  // Kann man später mit einem Auth-Context oder localStorage machen
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    // Redirect zum Login, wenn nicht authentifiziert
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
};

