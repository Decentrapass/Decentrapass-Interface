export const LOGO_COLORS = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
];

// WHAT MUST NOT BE DECRYPTED WHEN RECEIVING DATA
export const DO_NOT_DECRYPT = ["id", "numId", "lastEdited", "created", "type"];

// DECIDES WHAT INFO CAN BE DISPLAYED IN THE RECOMMENDED SECTION
export const SHOW_SEARCH = {
  login: ["username", "email", "notes"],
  card: ["number", "cardType", "expiryDate"],
  note: [],
};

export const TYPES = {
  0: "login",
  1: "card",
  2: "note",
};

export const TYPES_INT = {
  login: 0,
  card: 1,
  note: 2,
};

// DECIDES WHAT INFO IS DISPLAYED WHEN SHOWING AN ITEM
export const SHOW_DATA = {
  login: ["username", "email", "password", "notes"],
  card: ["name", "cardType", "number", "cvv", "expiryDate"],
  note: ["note"],
};

// DECIDES HOW THE FIELDS ARE WHEN DISPLAYED
const DATA_DISPLAY_LOGIN = {
  username: "normal",
  email: "normal",
  password: "hidden",
  notes: "medium",
};

const DATA_DISPLAY_CARD = {
  name: "normal",
  cardType: "normal",
  number: "hidden",
  cvv: "hidden",
  expiryDate: "normal",
};

const DATA_DISPLAY_NOTE = {
  note: "large",
};

export const DATA_DISPLAY = {
  login: DATA_DISPLAY_LOGIN,
  card: DATA_DISPLAY_CARD,
  note: DATA_DISPLAY_NOTE,
};
