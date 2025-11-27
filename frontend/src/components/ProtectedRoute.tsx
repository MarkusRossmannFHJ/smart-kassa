import { verifyAccessToken } from "../utils/jwttokens";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { signInUser } from "../../redux/slices/userSlice";
import type { USER_DTO } from "../../constants/User";
import { useEffect } from "react";
import { useNavigate } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Component used to redirect to register page if user not loged in on device
 * @param children all Components that should be only accesible if user is loged in
 * @returns
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

  // Überprüfen, ob der User eingeloggt ist
  // Kann man später mit einem Auth-Context oder localStorage machen
  const dispatch: AppDispatch = useDispatch();
  const navigator = useNavigate();

  useEffect(() => {
    async function getJWTTokens() {
      try {
        const userData: USER_DTO = await verifyAccessToken();
        if (!userData) {
          throw new Error("User Data invalid");
        }
        dispatch(
          signInUser({
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
          })
        );
      } catch {
        navigator("/register");
      }
    }
    getJWTTokens();
  }, [dispatch, navigator]);

  return <>{children}</>;
};

