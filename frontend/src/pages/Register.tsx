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

/**
 * The Sign Up page, where users Sign Up
 * @returns Register Page where Users can Sign Up
 */
function Register() {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-zinc-200 dark:bg-black">
      <Card className="w-11/12 max-w-sm">
        <CardHeader>
          <CardTitle>Konto erstellen</CardTitle>
          <CardDescription>
            Noch kein Konto? Jetzt registrieren
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input id="username" type="text" placeholder="John" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
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
                <Input id="password" type="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Registrieren
          </Button>
          <Button variant="outline" className="w-full">
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
