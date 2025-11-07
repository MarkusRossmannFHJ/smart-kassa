import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {Link} from "react-router-dom"
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
  useInvalidUsername,
  type PASSWORD_VALIDATOR,
} from "../hooks/useValidator";

/**
 * To handle if user clicked in input field and focuses it
 */
interface showError {
  UsernameFocused: boolean;
  EmailFocused: boolean;
  PasswordFocused: boolean;
}

/**
 * The Sign Up page, where users Sign Up
 * @returns Register Page where Users can Sign Up
 */
function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // to show the user how to input valid data and in which input field
  const [showHint, setShowHint] = useState<showError>({
    UsernameFocused: false,
    EmailFocused: false,
    PasswordFocused: false,
  });

  const hasShownToast = useRef(false);

  const invalidUsername = useInvalidUsername(username);
  const invalidEmail = useInvalidEmail(email);
  const invalidPassword: PASSWORD_VALIDATOR = useInvalidPassword(password);

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
    invalidUsername || invalidEmail || invalidPassword.passwordIsInvalid;

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-zinc-200 dark:bg-black">
      <Card className="w-11/12 max-w-sm py-4 px-2">
      <img src="Logo.png" width={220} height={220} alt="Logo" 
      className="mx-auto mb-2"></img>
        <CardHeader className="text-center mb-10">
          <CardTitle>Konto erstellen</CardTitle>
          <CardDescription>Noch kein Konto? Jetzt registrieren</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="John"
                  required
                  value={username}
                  className={
                    (invalidUsername &&
                      showHint.UsernameFocused &&
                      "border-2 border-red-500") ||
                    ""
                  }
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() =>
                    setShowHint((prev) => ({ ...prev, UsernameFocused: true }))
                  }
                  onFocus={() =>
                    setShowHint((prev) => ({ ...prev, UsernameFocused: false }))
                  }
                />
                {invalidUsername && showHint.UsernameFocused && (
                  <p className="text-red-500 text-sm">
                    Username darf nicht leer sein
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  className={
                    (invalidEmail &&
                      showHint.EmailFocused &&
                      "border-2 border-red-500") ||
                    ""
                  }
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() =>
                    setShowHint((prev) => ({ ...prev, EmailFocused: true }))
                  }
                  onFocus={() =>
                    setShowHint((prev) => ({ ...prev, EmailFocused: false }))
                  }
                />
                {invalidEmail && showHint.EmailFocused && (
                  <p className="text-red-500 text-sm">
                    Bitte geben Sie eine gültige E-Mail-Adresse ein
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
                    (invalidPassword.passwordIsInvalid &&
                      showHint.PasswordFocused &&
                      "border-2 border-red-500") ||
                    ""
                  }
                >
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    title="Über 6 Zeichen mit einer Zahl und einem Zeichen"
                    placeholder="6 Zeichen langes Passwort mit einer Zahl und einem Zeichen"
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
                {!invalidPassword.passwordhasNumber &&
                  showHint.PasswordFocused && (
                    <p className="text-red-500 text-sm">
                      Passwort braucht mindestens eine Nummer
                    </p>
                  )}
                {!invalidPassword.passwordhasSpecialChar &&
                  showHint.PasswordFocused && (
                    <p className="text-red-500 text-sm">
                      Passwort braucht mindestens ein Sonderzeichen
                    </p>
                  )}
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
            onClick={() =>
              toast("Registrierung erfolgreich! Sie werden weitergeleitet...", {
                position: "top-center",
                closeButton: true,
              })
            }
            disabled={formUnvalid}
          >
            Registrieren
          </Button>
          <Button variant="outline" className="w-full">
            Anmelden mit Google
          </Button>
          <div className="w-full flex justify-center">
            <Button variant="link" className="items-start">
              <Link to="/login" className="underline">Bereits registriert? Zum Login</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Register;
