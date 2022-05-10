import { createGlobalStyle } from "styled-components";
import { COLORS } from "~/constants";

const GlobalStyles = createGlobalStyle`
/*
  1. Use a more-intuitive box-sizing model.
*/
*,
*::before,
*::after {
  box-sizing: border-box;
}
/*
    2. Remove default margin
  */
* {
  margin: 0;
}
/*
    3. Allow percentage-based heights in the application
  */
html,
body {
  height: 100%;
}
/*
    Typographic tweaks!
    4. Add accessible line-height
    5. Improve text rendering
  */
body {
  line-height: 1.5;
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  background-color: hsl(${COLORS.orange});
  --orange: hsl(${COLORS.orange});
  --light-orange: hsl(${COLORS.lightOrange});
  --lighter-orange: hsl(${COLORS.lighterOrange});
  --lighter-gray: hsl(${COLORS.gray[100]});
  --light-gray: hsl(${COLORS.gray[300]});
  --gray: hsl(${COLORS.gray[500]});
  --dark-gray: hsl(${COLORS.gray[700]});
  --darker-gray: hsl(${COLORS.gray[900]});
}
/*
    6. Improve media defaults
  */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}
/*
    7. Remove built-in form typography styles
  */
input,
button,
textarea,
select {
  font: inherit;
}
/*
    8. Avoid text overflows
  */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}
/*
    9. Create a root stacking context
  */
#root,
#__next {
  isolation: isolate;
}
`;

export default GlobalStyles;
