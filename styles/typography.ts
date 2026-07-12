import { normalize } from "./responsive";

export const typography = {
  h1: {
    fontSize: normalize(32),
    fontWeight: "700" as const,
    lineHeight: normalize(40)
  },
  h2: {
    fontSize: normalize(26),
    fontWeight: "600" as const,
    lineHeight: normalize(34)
  },
  h3: {
    fontSize: normalize(16),
    fontWeight: "600" as const,
    lineHeight: normalize(22)
  },
  body: {
    fontSize: normalize(16),
    fontWeight: "400" as const,
    lineHeight: normalize(24)
  },
  caption: {
    fontSize: normalize(13),
    fontWeight: "400" as const,
    lineHeight: normalize(18)
  },
  button: {
    fontSize: normalize(16),
    fontWeight: "600" as const,
    lineHeight: normalize(22)
  }
};