import { createMuiTheme } from "@material-ui/core";
import { teal, blue, indigo, pink } from "@material-ui/core/colors";
import { Theme } from "../models";
const tealBlue = createMuiTheme({
  palette: {
    primary: {
      main: teal[400],
      light: teal[50]
    },
    secondary: {
      main: blue[100],
    },
  },
});
const indigoPink = createMuiTheme({
  palette: {
    primary: {
      main: indigo[400],
      light: indigo[50]
    },
    secondary: {
      main: pink[100],
    },
  },
});
const darkGreen = createMuiTheme({
  palette: {
    primary: {
      main: "#34495e",
      light: "#e9e9e9"
    },
    secondary: {
      main: "#66e9cf",
    },
  },
});
export const themes = {
  [Theme.TEAL_BLUE]: tealBlue,
  [Theme.INDIGO_PINK]: indigoPink,
  [Theme.DARK_GREEN]: darkGreen
};