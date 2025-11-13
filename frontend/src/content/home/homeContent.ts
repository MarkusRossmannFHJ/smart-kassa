
export interface HomeSection {
  title: string;
  color: string;
  buttons: string[];
}

export const homeContent: HomeSection[] = [
  {
    title: "Fahrten",
    color: "bg-violet-400",
    buttons: ["Boten Fahrt", "Personen Fahrt", "Start Fahrt", "End Fahrt"],
  },
  {
    title: "Berichte",
    color: "bg-red-400",
    buttons: ["Archiv", "Tagesbericht", "Wochenbericht", "Monatsbericht"],
  },
];
