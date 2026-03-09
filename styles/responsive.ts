import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

// Base dimensions (design reference)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

// Scale horizontally
export const scale = (size: number) =>
  (width / guidelineBaseWidth) * size;

// Scale vertically
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;

// Moderate scaling (best for fonts)
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Percentage width
export const wp = (percent: number) =>
  (width * percent) / 100;

// Percentage height
export const hp = (percent: number) =>
  (height * percent) / 100;

// Pixel perfect scaling
export const normalize = (size: number) =>
  Math.round(PixelRatio.roundToNearestPixel(moderateScale(size)));

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;