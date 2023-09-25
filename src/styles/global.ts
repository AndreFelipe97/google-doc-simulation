import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    padding: 0,
    margin: 0,
  },

  body: {
    backgroundColor: "#121214",
    color: "#E1E1E6",
    "-webkit-font-smoothing": "antialiased",
  },
});
