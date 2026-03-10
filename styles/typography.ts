import { normalize } from "./responsive";

export const typography = {
  h1: {
    fontSize: normalize(32),
    fontWeight: "700" as const
  },

  h2: {
    fontSize: normalize(26),
    fontWeight: "600" as const
  },

  h3: {
    fontSize: normalize(22),
    fontWeight: "600" as const
  },

  body: {
    fontSize: normalize(16),
    fontWeight: "400" as const
  },

  caption: {
    fontSize: normalize(13),
    fontWeight: "400" as const
  },

  button: {
    fontSize: normalize(16),
    fontWeight: "600" as const
  }
};