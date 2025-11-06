import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import {
  useInvalidEmail,
  useInvalidPassword,
  type PASSWORD_VALIDATOR,
} from "../hooks/useValidator";

/**
 * To handle if user clicked in input field and focuses it
 */
interface showError {
  IdentifierFocused: boolean;
  PasswordFocused: boolean;
}

/**
 * The Sign Up page, where users Sign Up
 * @returns Register Page where Users can Sign Up
 */
function Login() {
  const [identifier, setItentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // to show the user how to input valid data and in which input field
  const [showHint, setShowHint] = useState<showError>({
    IdentifierFocused: false,
    PasswordFocused: false,
  });

  const hasShownToast = useRef(false);

  const invalidIdentifier = identifier === "";
  const invalidPassword: PASSWORD_VALIDATOR = useInvalidPassword(password);

  function handleLogin() {
    // To decide wether name or email should be checked
    if (identifier && identifier.includes("@")) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const invalidEmail = useInvalidEmail(identifier);

      //Since we haven't any backend data, this is the only check that can be made for now
      if (invalidEmail) {
        return false;
      }
    }

    if (invalidPassword.passwordIsInvalid) {
      return false;
    }

    return true;
  }

  function handleToast() {
    const isLoginSuccessful = handleLogin();
    console.log(isLoginSuccessful);

    if (isLoginSuccessful) {
      toast("Login erfolgreich! Sie werden weitergeleitet...", {
        position: "top-center",
        closeButton: true,
      });
    } else {
      toast(
        "Login war nicht erfolgreich! Bitte kontrollieren Sie ihre Daten...",
        {
          position: "top-center",
          closeButton: true,
        }
      );
    }
  }

  useEffect(() => {
    if (!hasShownToast.current) {
      toast(
        "Sie müssen sich Registrieren oder Einlogen bevor sie unser Service nutzen können",
        {
          position: "top-center",
          closeButton: true,
          duration: 3000,
        }
      );
      hasShownToast.current = true;
    }
  }, []);

  //Form Validator, so the username is not empty, the email is not unvalid and the password is min. 6 chars long, one Special char and one Digit
  const formUnvalid =
    invalidIdentifier || !invalidPassword.passwordminimum6Chars;

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-zinc-200 dark:bg-black">
      <Card className="w-11/12 max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Logen Sie sich in ihr Account ein</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="identifier">Username or email</Label>
                <Input
                  id="identifier"
                  type="text"
                  placeholder="John or m@example.com"
                  required
                  value={identifier}
                  className={
                    (invalidIdentifier &&
                      showHint.IdentifierFocused &&
                      "border-2 border-red-500") ||
                    ""
                  }
                  onChange={(e) => setItentifier(e.target.value)}
                  onBlur={() =>
                    setShowHint((prev) => ({
                      ...prev,
                      IdentifierFocused: true,
                    }))
                  }
                  onFocus={() =>
                    setShowHint((prev) => ({
                      ...prev,
                      IdentifierFocused: false,
                    }))
                  }
                />
                {invalidIdentifier && showHint.IdentifierFocused && (
                  <p className="text-red-500 text-sm">
                    Dieses Feld darf nicht leer sein
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Passwort</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Passwort vergessen?
                  </a>
                </div>
                <InputGroup
                  className={
                    (!invalidPassword.passwordminimum6Chars &&
                      showHint.PasswordFocused &&
                      "border-2 border-red-500") ||
                    ""
                  }
                >
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    title="Über 6 Zeichen mit einer Zahl und einem Zeichen"
                    placeholder="******"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() =>
                      setShowHint((prev) => ({
                        ...prev,
                        PasswordFocused: true,
                      }))
                    }
                  />

                  <InputGroupAddon align="inline-end">
                    <div
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeClosed width={19} />
                      ) : (
                        <Eye width={19} className="text-zinc-700" />
                      )}
                    </div>
                  </InputGroupAddon>
                </InputGroup>
                {!invalidPassword.passwordminimum6Chars &&
                  showHint.PasswordFocused && (
                    <p className="text-red-500 text-sm">
                      Passwort braucht mindestens 6 Zeichen
                    </p>
                  )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={() => {
              handleToast();
            }}
            disabled={formUnvalid}
          >
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Anmelden mit Google
          </Button>
          <div className="w-full flex justify-center">
            <div className="text-center">
              <div className="text-center text-sm text-muted-foreground">
                <p>Noch kein Konto?</p>
                <Link
                  to="/register"
                  className="font-extrabold hover:underline"
                >
                  Registrieren Sie sich jetzt!
                </Link>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Login;
