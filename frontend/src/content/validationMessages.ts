// 🔹 Alle Validierungsnachrichten
export const validationMessages = {
  // 🔸 Login-bezogene Fehler
  login: {
    identifier: {
      invalid:
        "Bitte geben Sie einen gültigen Benutzernamen oder E-Mail-Adresse ein",
    },
    password: {
      tooShort: "Das Passwort muss mindestens 6 Zeichen enthalten",
      invalid:
        "Das Passwort muss mindestens eine Zahl und ein Sonderzeichen enthalten",
    },
  },

  // 🔸 Register-bezogene Fehler
  register: {
    username: {
      invalid: "Benutzername darf nicht leer sein",
      tooShort: "Der Benutzername muss mindestens 3 Zeichen lang sein",
    },
    email: {
      invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    },
    atu: {
      invalid: "Bitte geben Sie eine gültige Umsatzsteuer-ID (ATU) ein (Format: ATU12345678)",
    },
    fn: {
      invalid: "Bitte geben Sie eine gültige Firmenbuchnummer (FN) ein (Format:FN12345a)",
    },
    phone: {
      invalid: "Bitte geben Sie eine gültige Telefonnummer ein (7-20 Zeichen)",
    },
    password: {
      tooShort: "Das Passwort muss mindestens 6 Zeichen enthalten",
      missingNumber: "Das Passwort muss mindestens eine Zahl enthalten",
      missingSymbol:
        "Das Passwort muss mindestens ein Sonderzeichen enthalten"
    },
  },
} as const
