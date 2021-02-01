import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@material-ui/core';
import { themes } from "./utilities/global.theme";
import { Theme } from "./models";
import { globalStore } from "./store";

const Boostraping = () => {
  const [theme, setTheme] = React.useState<Theme>(
    localStorage.getItem("theme") as Theme || Theme.TEAL_BLUE
  );
  React.useEffect(() => {
    const subs = globalStore.$theme.subscribe((newTheme: Theme) => {
      setTheme(newTheme);
    });
    return () => {
      if (subs)
        subs.unsubscribe();
    };
  }, []);
  return (
    <ThemeProvider theme={themes[theme]}>
      <App />
    </ThemeProvider>
  );
}

ReactDOM.render(
  <Boostraping />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
