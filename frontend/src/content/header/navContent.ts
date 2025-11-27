// src/content/navContent.ts

export interface NavItem {
  label: string;
  path: string;
}

export const navContent: NavItem[] = [
  { label: "Beleg erstellen", path: "/beleg" },
  { label: "Archiv", path: "/archiv" },
  { label: "Produkte bearbeiten", path: "/produkte" },
  { label: "Tagesbericht", path: "/bericht/tag" },
  { label: "Monatsbericht", path: "/bericht/monat" },
  { label: "Berichte", path: "/berichte" },
];
