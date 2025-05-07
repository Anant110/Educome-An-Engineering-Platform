// src/Components/FeatureDropDown.js
import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const FeatureDropDown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="explore-button"
        aria-controls={open ? 'explore-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Explore
      </Button>
      <Menu
        id="explore-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'explore-button',
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/path1">Option 1</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/path2">Option 2</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/path3">Option 3</MenuItem>
      </Menu>
    </div>
  );
};

export default FeatureDropDown;
