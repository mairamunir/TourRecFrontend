import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/user.reducer';


const settings = ['Update Password', 'View Profile','View Wishlist','Log Out'];

function DropdownMenu() {
 
  const [anchorElUser, setAnchorElUser] = React.useState(null);
const navigate = useNavigate();
  const dispatch =useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (setting) => {
    handleCloseUserMenu();
    if (setting === 'Log Out') {
      dispatch(logout());
      navigate('/');
    } else if (setting === 'Update Password') {
      navigate('/updatePassword'); 
    } else if (setting === 'View Profile') {
      navigate('/viewProfile'); 
    }else if(setting === 'View Wishlist') {
      navigate('/viewWishlist'); 
    }
  };




  return (
    <Box sx={{ flexGrow: 0 }}>
    <Tooltip title="Open settings">
      <IconButton  onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <MenuIcon sx={{color:'#015656', '$:hover': {color: 'gray'}}} />
      </IconButton>
    </Tooltip>
    <Menu
      sx={{ mt: '45px' }}
      id="menu-appbar"
      anchorEl={anchorElUser}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorElUser)}
      onClose={handleCloseUserMenu}
    >
      {settings.map((setting) => (
        <MenuItem key={setting} onClick={() => handleMenuClick(setting)}>
          <Typography textAlign="center">{setting}</Typography>
        </MenuItem>
      ))}
    </Menu>
  </Box>
);
}
export default DropdownMenu;



