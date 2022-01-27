import { useState } from 'react';

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openMenu = (element: HTMLElement) => {
    setAnchorEl(element);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return {
    anchorEl,
    open: Boolean(anchorEl),
    openMenu,
    closeMenu,
  };
};
