import { ExpandMore } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="header">
      <div className="logo">@mayur_bahuguna</div>
      <nav className={isOpen ? "nav active" : "nav"}>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li
            style={{ display: "flex", alignItems: "center" }}
            onClick={handleMenuClick}
          >
            <a>Contact</a>
            <IconButton
              disableRipple
              aria-controls="dropdown-menu"
              aria-haspopup="true"
              color="inherit"
              sx
            >
              <ExpandMore />
            </IconButton>
          </li>
          <li>
            <Menu
              id="dropdown-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "dropdown-button",
                boxShadow: "none",
              }}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: "16ch", // Adjust width as needed
                  boxShadow: "none",
                  border: "1px solid #e0e0e0",
                  transform: "translateY(9px)",
                },
              }}
            >
              <MenuItem onClick={handleClose}>Option 1</MenuItem>
              <MenuItem onClick={handleClose}>Option 2</MenuItem>
              <MenuItem onClick={handleClose}>Option 3</MenuItem>
            </Menu>
          </li>
        </ul>
      </nav>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
};

export default Header;
