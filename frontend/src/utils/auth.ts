import axios, { AxiosError } from "axios";
import { AuthStorage } from "./localStorageTokens";
import type { AppDispatch } from "../../redux/store";
import { signInUser } from "../../redux/slices/userSlice";

export async function register(
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  password: string,
  business: string,
  dispatch: AppDispatch
) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/register`,
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone_number: phoneNumber,
        password: password,
        business: business,
      }
    );

    if (!response) {
      throw new Error("Response is Empty");
    }
    console.log(response.data);
    console.log(response);
    console.log(response.data.message);
    console.log(response.data.user);
    AuthStorage.setTokens(response.data.accessToken);
    dispatch(
      signInUser({
        id: response.data.id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
      })
    );

    return await response.data;
  } catch (error) {
    
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        throw new Error("Internal Server Error");
      }
      if (error.response?.status === 409) {
        throw new Error("Email already exists");
      }
      if (error.response?.status === 400) {
        throw new Error("Missing Fields");
      }
    } else {
      throw new Error("Unknown Error");
    }
  }
}
