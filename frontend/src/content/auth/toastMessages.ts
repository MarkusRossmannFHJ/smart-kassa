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
      title: `${shared.errorPrefix} Login fehlgeschlagen! Bitte überprüfen Sie Ihre Username/E-Mail-Adresse und Ihr Kennwort.`,
    },
    warning: {
      title:
        "Hinweis: Sie müssen sich anmelden oder registrieren, bevor Sie unseren Service nutzen können.",
    },
  },
  register: {
    success: {
      title: `${shared.successPrefix} Registrierung erfolgreich! Sie können sich jetzt anmelden.`,
    },
    error: {
      title: `${shared.errorPrefix} Registrierung fehlgeschlagen! Bitte überprüfen Sie Ihre Eingaben und versuchen Sie es erneut.`,
    },
    warning: {
      title:
        "Hinweis: Sie müssen sich anmelden oder registrieren, bevor Sie unseren Service nutzen können.",
    },
  },
} as const;
