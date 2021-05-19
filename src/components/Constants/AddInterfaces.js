// Interfaces for the creation fields needed

// Stores key, displayed name, and type of field
const LOGIN_IF = {
  title: ["title", "normal"],
  url: ["website", "normal"],
  username: ["username", "normal"],
  email: ["email", "normal"],
  password: ["password", "hidden"],
  notes: ["notes", "large"],
};

// Stores key, displayed name, and type of field
const CARD_IF = {
  title: ["title", "normal"],
  name: ["name on card", "normal"],
  cardType: ["card type", "select"],
  number: ["number", "hidden"],
  cvv: ["cvv", "hidden"],
  expiryDate: ["expiry date", "date"],
};

// Stores key, displayed name, and type of field
const NOTE_IF = {
  title: ["title", "normal"],
  note: ["note", "large"],
};

export const IF = {
  login: LOGIN_IF,
  card: CARD_IF,
  note: NOTE_IF,
};
