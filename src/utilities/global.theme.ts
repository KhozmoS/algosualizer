import { createMuiTheme } from "@material-ui/core";
import { teal, blue } from "@material-ui/core/colors";

const globalTheme = createMuiTheme({
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

export default globalTheme;