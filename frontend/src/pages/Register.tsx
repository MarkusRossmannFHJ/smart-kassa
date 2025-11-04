import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
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

/**
 * To handle if user clicked in input field and focuses it
 */
interface focused {
  clicked: boolean;
  focus: boolean;
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
  const [focusUsername, setFocusUsername] = useState<focused>({
    clicked: false,
    focus: false,
  });
  const [focusEmail, setFocusEmail] = useState<focused>({
    clicked: false,
    focus: false,
  });
  const [focusPassword, setFocusPassword] = useState<focused>({
    clicked: false,
    focus: false,
  });
  const hasShownToast = useRef(false);

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

  const usernameIsEmpty = username === "";
  const usernameIsInvalid = usernameIsEmpty;

  const emailMatchesPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const emailIsInvalid = !emailMatchesPattern;

  const passwordhasSpecialChar = /[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]/.test(
    password
  );
  const passwordhasNumber = /[0-9]/.test(password);
  const passwordminimum6Chars = password.length > 6;
  const passwordIsInvalid =
    !passwordminimum6Chars || !passwordhasNumber || !passwordhasSpecialChar;

  //Form Validator, so the username is not empty, the email is not unvalid and the password is min. 6 chars long, one Special char and one Digit
  const formUnvalid =
    usernameIsInvalid ||
    emailIsInvalid ||
    passwordIsInvalid;

  return (
    <main className="w-screen h-screen flex justify-center items-center bg-zinc-200 dark:bg-black">
      <Card className="w-11/12 max-w-sm">
        <CardHeader>
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
                    focusUsername.clicked &&
                    focusUsername.focus &&
                    usernameIsInvalid
                      ? "border-2 border-red-500"
                      : ""
                  }
                  onFocus={() =>
                    setFocusUsername((prev) => ({
                      ...prev,
                      focus: true,
                    }))
                  }
                  onBlur={() =>
                    setFocusUsername((prev) => ({
                      ...prev,
                      focus: false,
                      clicked: true,
                    }))
                  }
                  onChange={(e) => setUsername(e.target.value)}
                />
                {focusUsername.focus &&
                  focusUsername.clicked &&
                  usernameIsEmpty && (
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
                    focusEmail.clicked &&
                    focusEmail.focus &&
                    emailIsInvalid
                      ? "border-2 border-red-500"
                      : ""
                  }
                  onFocus={() =>
                    setFocusEmail((prev) => ({
                      ...prev,
                      focus: true,
                    }))
                  }
                  onBlur={() =>
                    setFocusEmail((prev) => ({
                      ...prev,
                      focus: false,
                      clicked: true,
                    }))
                  }
                  onChange={(e) => setEmail(e.target.value)}
                />
                {focusEmail.focus &&
                  focusEmail.clicked &&
                  emailIsInvalid && (
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
                    focusPassword.clicked &&
                    focusPassword.focus &&
                    passwordIsInvalid
                      ? "border-2 border-red-500"
                      : ""
                  }
                >
                  <InputGroupInput
                    id="password"
                    type={showPassword ? "text" : "password"}
                    title="Über 6 Zeichen mit einer Zahl und einem Zeichen"
                    placeholder="6 Zeichen langes Passwort mit einer Zahl und einem Zeichen"
                    required
                    value={password}
                    onFocus={() =>
                      setFocusPassword((prev) => ({
                        ...prev,
                        focus: true,
                      }))
                    }
                    onBlur={() =>
                      setFocusPassword((prev) => ({
                        ...prev,
                        focus: false,
                        clicked: true,
                      }))
                    }
                    onChange={(e) => setPassword(e.target.value)}
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
                {focusPassword.focus &&
                  focusPassword.clicked &&
                  !passwordhasNumber && (
                    <p className="text-red-500 text-sm">
                      Passwort braucht mindestens eine Nummer
                    </p>
                  )}
                {focusPassword.focus &&
                  focusPassword.clicked &&
                  !passwordhasSpecialChar && (
                    <p className="text-red-500 text-sm">
                      Passwort braucht mindestens ein Sonderzeichen
                    </p>
                  )}
                {focusPassword.focus &&
                  focusPassword.clicked &&
                  !passwordminimum6Chars && (
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
                description: "Sunday, December 03, 2023 at 9:00 AM",
                position: "top-center",
                closeButton: true,
              })
            }
            disabled={formUnvalid}
          >
            Registrieren
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => console.log()}
          >
            Anmelden mit Google
          </Button>
          <div className="w-full flex justify-center">
            <Button variant="link" className="items-start">
              Bereits registriert? Zum Login
            </Button>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Register;
