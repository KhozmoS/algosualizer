import React from 'react';
import { FormatColorFill } from "@material-ui/icons";
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { Theme } from "../models";
import { globalStore } from "../store";
export function ThemePicker() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleSelectedTheme = (theme: Theme) => {
    globalStore.setTheme(theme);
    handleClose();
  }
  return (
    <>
      <IconButton 
        onClick={handleClick} 
        aria-label="color picker" 
        color="inherit" 
        aria-controls="theme-menu" 
        aria-haspopup="true"
      >
        <FormatColorFill />
      </IconButton>
      <Menu 
        id="theme-menu" 
        anchorEl={anchorEl} 
        keepMounted 
        open={Boolean(anchorEl)} 
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelectedTheme(Theme.TEAL_BLUE)}>
          Teal & Blue
        </MenuItem>
        <MenuItem onClick={() => handleSelectedTheme(Theme.INDIGO_PINK)}>
          Indigo & Pink
        </MenuItem>
        <MenuItem onClick={() => handleSelectedTheme(Theme.DARK_GREEN)}>
          Dark & Green
        </MenuItem>
      </Menu>
    </>
  );
}