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
  fn: string,
  atu: string,
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
        fn: fn,
        atu: atu,
      },
      { withCredentials: true } // to set the refresh token in the Cookie
    );

    if (!response) {
      throw new Error("Response is Empty");
    }

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
    console.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 500) {
        throw new Error("Internal Server Error");
      }
      if (error.response?.status === 409) {
        if (
          error.response?.data.error === "User with this email already exists"
        ) {
          throw new Error("Email already exists");
        }
        if (
          error.response?.data.error ===
          `Ein Account mit der FN '${fn}' existiert bereits.`
        ) {
          throw new Error("FN already exists");
        }
        if (
          error.response?.data.error ===
          `Ein Account mit der Telefonnumer '${phoneNumber}' existiert bereits.`
        ) {
          throw new Error("Phonenumber already exists");
        }
        if (
          error.response?.data.error ===
          `Ein Account mit der ATU-Nummer '${atu}' existiert bereits.`
        ) {
          throw new Error("ATU already exists");
        }
      }
      if (error.response?.status === 400) {
        throw new Error("Missing Fields");
      }
    } else {
      throw new Error("Unknown Error");
    }
  }
}

export async function login(email: string, password: string) {
  if (!email || !password) {
    throw new Error("Missing Fields");
  }

  try {
    const { status, data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true } // to set the refresh token in the Cookie
    );

    if (!status || !data) {
      throw new Error("Response is empty");
    }
    AuthStorage.setTokens(data.accessToken);
    return await data;
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        throw new Error("Wrong Email or Password");
      }
      if (error.response?.status === 500) {
        throw new Error("Internal Server Error");
      }
    } else {
      throw new Error("Internal Server Error");
    }
  }
}
