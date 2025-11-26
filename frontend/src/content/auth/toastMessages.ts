// 🔹 Gemeinsame Toast-Texte
const shared = {
  errorPrefix: "Fehler:",
  successPrefix: "Erfolg:",
} as const;

// 🔹 Auth-Toasts
export const toastMessages = {
  shared,
  login: {
    success: {
      title: `${shared.successPrefix} Login erfolgreich! Sie werden weitergeleitet...`,
    },
    error: {
      title: `${shared.errorPrefix} Login fehlgeschlagen! Bitte überprüfen Sie Ihre E-Mail-Adresse und Ihr Kennwort.`,
    },
    warning: {
      title:
        "Hinweis: Sie müssen sich anmelden oder registrieren, bevor Sie unseren Service nutzen können.",
    },
  },
  register: {
    success: {
      title: `${shared.successPrefix} Registrierung erfolgreich! Sie werden jetzt weitergeleitet`,
    },
    error: {
      title: `${shared.errorPrefix} Registrierung fehlgeschlagen! Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.`,
      emailAlreadyInUse: `${shared.errorPrefix} Diese Email wird bereits verwendet, Melden sie sich an oder Erstellen sie ein neues Konto mit einer anderen Email`,
      phoneNumberAlreadyInUse: `${shared.errorPrefix} Diese Telefonnumer wird bereits verwendet, Melden sie sich mit ihrer Email an oder geben sie eine neue Telefonnumer an `,
      fnAlreadyInUse: `${shared.errorPrefix} Diese Firmenbuchnummer wird bereits verwendet, Melden sie sich mit ihrer Email an`,
      atuAlreadyInUse: `${shared.errorPrefix} Diese ATU-Nummer wird bereits verwendet, Melden sie sich mit ihrer Email an`,
    },
    warning: {
      title:
        "Hinweis: Sie müssen sich anmelden oder registrieren, bevor Sie unseren Service nutzen können.",
    },
  },
} as const;
