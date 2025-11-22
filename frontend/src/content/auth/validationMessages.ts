// 🔹 Alle Validierungsnachrichten
export const validationMessages = {
  // 🔸 Login-bezogene Fehler
  login: {
<<<<<<< HEAD
    identifier: {
      invalid:
        "Bitte geben Sie einen gültigen Benutzernamen oder E-Mail-Adresse ein",
    },
    password: {
      tooShort: "Das Passwort muss mindestens 6 Zeichen enthalten",
      invalid:
=======
    email: {
      invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
      required: "E-Mail-Adresse darf nicht leer sein",
    },
    password: {
      tooShort: "Passwort braucht mindestens 8 Zeichen",
      invalidFormat:
>>>>>>> frontend
        "Das Passwort muss mindestens eine Zahl und ein Sonderzeichen enthalten",
    },
  },

  // 🔸 Register-bezogene Fehler
  register: {
<<<<<<< HEAD
    username: {
      invalid: "Benutzername darf nicht leer sein",
      tooShort: "Der Benutzername muss mindestens 3 Zeichen lang sein",
=======
    vorname: {
      required: "Bitten geben Sie ihren Vornamen ein",
    },
    nachanme: {
      required: "Bitten geben Sie ihren Nachnamen ein",
>>>>>>> frontend
    },
    email: {
      invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    },
    atu: {
      invalid:
        "Bitte geben Sie eine gültige Umsatzsteuer-ID ein (Format: ATU123456789)",
    },
    fn: {
      invalid:
        "Bitte geben Sie eine gültige Firmenbuchnummer ein (Format:FN123456a)",
    },
    phone: {
      invalid: "Bitte geben Sie eine gültige Telefonnummer ein (7-20 Zeichen)",
    },
    password: {
      tooShort: "Das Passwort muss mindestens 8 Zeichen enthalten",
      missingNumber: "Das Passwort muss mindestens eine Zahl enthalten",
      missingSymbol:
        "Das Passwort muss mindestens ein Sonderzeichen enthalten"
    },
    confirmPassword: {
    required: "Bitte bestätigen Sie Ihr Passwort",
    invalid: "Die Passwörter stimmen nicht überein",
  },
  },
} as const;
