import { normalize } from "./responsive";

export const typography = {
  h1: {
    fontSize: normalize(32),
    fontWeight: "700"
  },

  h2: {
    fontSize: normalize(26),
    fontWeight: "600"
  },

  h3: {
    fontSize: normalize(22),
    fontWeight: "600"
  },

  body: {
    fontSize: normalize(16),
    fontWeight: "400"
  },

  caption: {
    fontSize: normalize(13),
    fontWeight: "400"
  },

  button: {
    fontSize: normalize(16),
    fontWeight: "600"
  }
};
