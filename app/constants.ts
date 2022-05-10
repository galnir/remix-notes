export const COLORS = {
  white: "0deg 0% 100%",
  gray: {
    100: "185deg 5% 95%",
    300: "190deg 5% 80%",
    500: "196deg 4% 60%",
    700: "220deg 5% 40%",
    900: "220deg 3% 20%",
  },
  orange: "22deg 100% 61%",
  lightOrange: "25deg 96% 70%",
  lighterOrange: "26deg 98% 79%",
};

export const WEIGHTS = {
  normal: 500,
  medium: 600,
  bold: 800,
};

export const BREAKPOINTS = {
  phone: 600,
  tablet: 950,
  laptop: 1300,
};

export const QUERIES = {
  phoneAndSmaller: `(max-width: ${BREAKPOINTS.phone / 16}rem)`,
  tabletAndSmaller: `(max-width: ${BREAKPOINTS.tablet / 16}rem)`,
  laptopAndSmaller: `(max-width: ${BREAKPOINTS.laptop / 16}rem)`,
};
