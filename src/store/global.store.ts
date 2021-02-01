import { Theme } from "../models";
import { BehaviorSubject } from 'rxjs';

const theme = new BehaviorSubject<Theme>(
  window.localStorage.getItem("theme") as Theme || Theme.TEAL_BLUE
);

export const globalStore = {
  $theme: theme.asObservable(),
  setTheme: (newTheme: Theme) => { 
    theme.next(newTheme);
    window.localStorage.setItem("theme", newTheme) 
  }
};