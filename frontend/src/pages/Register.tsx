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
import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../components/ui/input-group";
import { Eye, EyeClosed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useInvalidATU,
  useInvalidEmail,
  useInvalidFirmenbuchnummer,
  useInvalidPassword,
  useInvalidTelefonnummer,
  useInvalidUsername,
  type PASSWORD_VALIDATOR,
} from "../hooks/useValidator";
import { authContent } from "../content/auth/auth";
import { validationMessages } from "../content/auth/validationMessages";
import { toastMessages } from "../content/auth/toastMessages";
import type { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useWarningToast } from "../hooks/useToast";
import { register } from "../utils/auth";
import { toast } from "sonner";

/**
 * To handle if user clicked in input field and focuses it
 */
interface showError {
  Firstnamefocused: boolean;
  LastnameFocused: boolean;
  EmailFocused: boolean;
  PasswordFocused: boolean;
  ATUFocused: boolean;
  FNFocused: boolean;
  TelefonnummerFocused: boolean;
}

/**
 * The Sign Up page, where users Sign Up
 * @returns Register Page where Users can Sign Up
 * @author Casper Zielinski
 * @author Umejr Dzinovicz
 */
function Register() {
  // useState Hooks for the Form
  const [firstname, setFirstname] = useState("");
  const [lastanme, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [atu, setAtu] = useState("");
  const [firmenbuchnummer, setFirmenbuchnummer] = useState("");
  const [telefonnummer, setTelefonnummer] = useState("");

  const navigator = useNavigate();

  // Constant Values for Messages for the User
  const r = authContent.register;
  const v = validationMessages.register;
  const t = toastMessages.register;

  const [showPassword, setShowPassword] = useState(false);
  // to show the user how to input valid data and in which input field
  const [showHint, setShowHint] = useState<showError>({
    Firstnamefocused: false,
    LastnameFocused: false,
    EmailFocused: false,
    PasswordFocused: false,
    ATUFocused: false,
    FNFocused: false,
    TelefonnummerFocused: false,
  });

  // invalid... returns true if used value is invalid
  const invalidFirstname = useInvalidUsername(firstname);
  const invalidLastname = useInvalidUsername(lastanme);
  const invalidEmail = useInvalidEmail(email);
  const invalidATU = useInvalidATU(atu);
  const invalidFN = useInvalidFirmenbuchnummer(firmenbuchnummer);
  const invalidTelefonNumber = useInvalidTelefonnummer(telefonnummer);
  const invalidPassword: PASSWORD_VALIDATOR = useInvalidPassword(password);

  // Redux States and Dispatches
  const toastState = useSelector((state: RootState) => state.toastState);
  const dispatch: AppDispatch = useDispatch();

  // to show the User that he has to log in to use the app
  useWarningToast(toastState.showWarning, t.warning.title, dispatch);

  //Form Validator, so the username is not empty, the email is not unvalid and the password is min. 6 chars long, one Special char and one Digit
  const formUnvalid =
    invalidFirstname ||
    invalidLastname ||
    invalidEmail ||
    invalidPassword.passwordIsInvalid ||
    invalidATU ||
    invalidFN ||
    invalidTelefonNumber;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await register(
        firstname,
        lastanme,
        email,
        telefonnummer,
        password,
        "Businnes muss im Frontend implementiert werden",
        firmenbuchnummer,
        atu,
        dispatch // to set Global User Variable (Injected)
      );
      toast.success(t.success.title);
      navigator("/");
    } catch (error) {
      console.error(error);
      toast.error(t.error.title);
    }
  };

  return (
    <main className="min-w-screen min-h-screen flex justify-center items-center bg-zinc-200 dark:bg-black overflow-y-auto scrollbar-hide">
      <Card className="w-11/12 max-w-sm my-5 dark:bg-zinc-900 pt-4">
        <img
          src="Logo.png"
          width={220}
          height={220}
          alt="Logo"
          className="mx-auto mb-2"
        ></img>
        <CardHeader className="text-center">
          <CardTitle>{r.heading.title}</CardTitle>
          <CardDescription>{r.heading.subtitle}</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="vorname">{r.labels.vorname}</Label>
                <Input
                  id="vorname"
                  type="text"
                  placeholder={r.placeholders.vorname}
                  required
                  value={firstname}
                  className={
                    (invalidFirstname &&
                      showHint.Firstnamefocused &&
                      "border-2 border-red-500") ||
                    ""
                  }
                  onChange={(e) => setFirstname(e.target.value)}
                  onBlur={() =>
                    setShowHint((prev) => ({ ...prev, Firstnamefocused: true }))
                  }
                  onFocus={() =>
                    setShowHint((prev) => ({
                      ...prev,
                      Firstnamefocused: false,
                    }))
                  }
                />
                <AnimatePresence>
                  {invalidFirstname && showHint.Firstnamefocused && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 text-sm"
                    >
                      {v.vorname.required}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nachname">{r.labels.nachanme}</Label>
                <Input
                  id="nachname"
                  type="text"
                  placeholder={r.placeholders.nachanme}
                  required
                  value={lastanme}
                  className={
                    (invalidLastname &&
                      showHint.LastnameFocused &&
                      "border-2 border-red-500") ||
                    ""
                  }
                  onChange={(e) => setLastname(e.target.value)}
                  onBlur={() =>
                    setShowHint((prev) => ({ ...prev, LastnameFocused: true }))
                  }
                  onFocus={() =>
                    setShowHint((prev) => ({ ...prev, LastnameFocused: false }))
                  }
                />
                <AnimatePresence>
                  {invalidLastname && showHint.LastnameFocused && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 text-sm"
                    >
                      {v.nachanme.required}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">{r.labels.email}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={r.placeholders.email}
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
                <AnimatePresence>
                  {invalidEmail && showHint.EmailFocused && (
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
                <Label htmlFor="ATU">{r.labels.atu}</Label>
                <Input
                  id="ATU"
                  type="text"
                  placeholder={r.placeholders.atu}
                  required
                  value={atu}
                  className={
                    (invalidATU &&
                      showHint.ATUFocused &&
                      "border-2 border-red-500") ||
                    ""
                  }
                  onChange={(e) => setAtu(e.target.value)}
                  onBlur={() =>
                    setShowHint((prev) => ({ ...prev, ATUFocused: true }))
                  }
                  onFocus={() =>
                    setShowHint((prev) => ({ ...prev, ATUFocused: false }))
                  }
                />
                <AnimatePresence>
                  {invalidATU && showHint.ATUFocused && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 text-sm"
                    >
                      {v.atu.invalid}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="FirmenBuchNummer">{r.labels.fn}</Label>
                <Input
                  id="FirmenBuchNummer"
                  type="text"
                  placeholder={r.placeholders.fn}
                  required
                  value={firmenbuchnummer}
                  className={
                    (invalidFN &&
                      showHint.FNFocused &&
                      "border-2 border-red-500") ||
                    ""
                  }
                  onChange={(e) => setFirmenbuchnummer(e.target.value)}
                  onBlur={() =>
                    setShowHint((prev) => ({ ...prev, FNFocused: true }))
                  }
                  onFocus={() =>
                    setShowHint((prev) => ({ ...prev, FNFocused: false }))
                  }
                />
                <AnimatePresence>
                  {invalidFN && showHint.FNFocused && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 text-sm"
                    >
                      {v.fn.invalid}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="Telefonnummer">{r.labels.phone}</Label>
                <Input
                  id="Telefonnummer"
                  type="tel"
                  placeholder={r.placeholders.phone}
                  required
                  value={telefonnummer}
                  className={
                    (invalidTelefonNumber &&
                      showHint.TelefonnummerFocused &&
                      "border-2 border-red-500") ||
                    ""
                  }
                  onChange={(e) => setTelefonnummer(e.target.value)}
                  onBlur={() =>
                    setShowHint((prev) => ({
                      ...prev,
                      TelefonnummerFocused: true,
                    }))
                  }
                  onFocus={() =>
                    setShowHint((prev) => ({
                      ...prev,
                      TelefonnummerFocused: false,
                    }))
                  }
                />
                <AnimatePresence>
                  {invalidTelefonNumber && showHint.TelefonnummerFocused && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 text-sm"
                    >
                      {v.phone.invalid}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">{r.labels.password}</Label>

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
                    placeholder={r.placeholders.password}
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
                  {!invalidPassword.passwordhasNumber &&
                    showHint.PasswordFocused && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-red-500 text-sm"
                      >
                        {v.password.missingNumber}
                      </motion.p>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                  {!invalidPassword.passwordhasSpecialChar &&
                    showHint.PasswordFocused && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-red-500 text-sm"
                      >
                        {v.password.missingSymbol}
                      </motion.p>
                    )}
                </AnimatePresence>
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
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={formUnvalid}>
              {r.buttons.register}
            </Button>
            <Button type="button" variant="outline" className="w-full">
              {r.buttons.google}
            </Button>
            <div className="w-full flex justify-center mt-2 text-center">
              <div className="text-sm text-muted-foreground">
                <p>{r.footer.text}</p>
                <Link
                  to="/login"
                  className="font-extrabold underline hover:text-violet-400"
                >
                  {r.footer.link}
                </Link>
              </div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}

export default Register;
