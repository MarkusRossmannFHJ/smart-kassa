// 🔹 Alle Validierungsnachrichten
export const validationMessages = {
  // 🔸 Login-bezogene Fehler
  login: {
    identifier: {
      invalid:
        "Bitte geben Sie einen gültigen Benutzernamen oder eine E-Mail-Adresse ein",
      required: "Benutzername / Username darf nicht leer sein",
    },
    password: {
      tooShort: "Passwort braucht mindestens 8 Zeichen",
      invalidFormat:
        "Das Passwort muss mindestens eine Zahl und ein Sonderzeichen enthalten",
    },
  },

  // 🔸 Register-bezogene Fehler
  register: {
    vorname: {
      required: "Bitten geben Sie ihren Vornamen ein",
    },
    nachanme: {
      required: "Bitten geben Sie ihren Nachnamen ein",
    },
    email: {
      invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    },
    atu: {
      invalid:
        "Bitte geben Sie eine gültige Umsatzsteuer-ID (ATU) ein (Format: ATU123456789)",
    },
    fn: {
      invalid:
        "Bitte geben Sie eine gültige Firmenbuchnummer (FN) ein (Format:FN123456a)",
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
  },
} as const;
