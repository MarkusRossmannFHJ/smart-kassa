import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
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
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeClosed } from "lucide-react";
import {
  useInvalidEmail,
  useInvalidPassword,
  type PASSWORD_VALIDATOR,
} from "../hooks/useValidator";
import { authContent } from "../content/auth/auth";
import { validationMessages } from "../content/auth/validationMessages";
import { toastMessages } from "../content/auth/toastMessages";
import { useWarningToast } from "../hooks/useToast";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import { login } from "@/utils/auth";

/**
 * To handle if user clicked in input field and focuses it
 */
interface showError {
  EmailFocused: boolean;
  PasswordFocused: boolean;
}

/**
 * The Sign Up page, where users Sign Up
 * @returns Register Page where Users can Sign Up
 */
function Login() {
  const [email, setItentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // to show the user how to input valid data and in which input field
  const [showHint, setShowHint] = useState<showError>({
    EmailFocused: false,
    PasswordFocused: false,
  });

  const l = authContent.login;
  const v = validationMessages.login;
  const t = toastMessages.login;

  const navigator = useNavigate();

  // Redux States and Dispatches
  const toastState = useSelector((state: RootState) => state.toastState);
  const dispatch: AppDispatch = useDispatch();

  const invalidemail = useInvalidEmail(email);
  const invalidPassword: PASSWORD_VALIDATOR = useInvalidPassword(password);

  async function handleLogin() {
    try {
      await login(email, password);
      handleToast(true);
      navigator("/");
    } catch (error) {
      console.error(error);
      handleToast(false);
      return false;
    }
  }

  async function handleToast(isLoginSuccessful: boolean) {
    if (isLoginSuccessful) {
      toast(t.success.title, {
        position: "top-center",
        closeButton: true,
      });
    } else {
      toast(t.error.title, {
        position: "top-center",
        closeButton: true,
      });
    }
  }

  useWarningToast(toastState.showWarning, t.warning.title, dispatch);

  //Form Validator, so the username is not empty, the email is not unvalid and the password is min. 6 chars long, one Special char and one Digit
  const formUnvalid = invalidemail || !invalidPassword.passwordminimum6Chars;

  return (
    <main
      className="min-w-screen min-h-screen flex justify-center items-center bg-zinc-200
     dark:bg-black overflow-y-auto scrollbar-hide"
    >
      <Card className="w-11/12 max-w-sm my-5 dark:bg-zinc-900 pt-4">
        <img
          src="Logo.png"
          width={220}
          height={220}
          alt="Logo"
          className="mx-auto mb-2"
        ></img>
        <CardHeader className="text-center">
          <CardTitle>{l.heading.title}</CardTitle>
          <CardDescription>{l.heading.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">{l.labels.email}</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder={l.placeholders.email}
                  required
                  value={email}
                  className={
                    (invalidemail &&
                      showHint.EmailFocused &&
                      "border-2 border-red-500") ||
                    ""
                  }
                  onChange={(e) => setItentifier(e.target.value)}
                  onBlur={() =>
                    setShowHint((prev) => ({
                      ...prev,
                      EmailFocused: true,
                    }))
                  }
                  onFocus={() =>
                    setShowHint((prev) => ({
                      ...prev,
                      EmailFocused: false,
                    }))
                  }
                />
                <AnimatePresence>
                  {invalidemail && showHint.EmailFocused && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 text-sm"
                    >
                      {v.email.invalid}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{l.labels.password}</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm text-muted-foreground font-extrabold underline hover:text-violet-400"
                  >
                    {l.links.forgotPassword}
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
                    placeholder={l.placeholders.password}
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
                      data-testid="password-toggle"
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
                <AnimatePresence>
                  {!invalidPassword.passwordminimum6Chars &&
                    showHint.PasswordFocused && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-red-500 text-sm"
                      >
                        {v.password.tooShort}
                      </motion.p>
                    )}
                </AnimatePresence>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={() => {
              handleLogin();
            }}
            disabled={formUnvalid}
          >
            {l.buttons.login}
          </Button>
          <Button variant="outline" className="w-full">
            {l.buttons.google}
          </Button>
          <div className="w-full flex justify-center mt-2 text-center">
            <div className="text-sm text-muted-foreground">
              <p>{l.footer.text}</p>
              <Link
                to="/register"
                className="font-extrabold underline hover:text-violet-400"
              >
                {l.footer.link}
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Login;
