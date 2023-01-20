import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import RocketLaunch from "@mui/icons-material/RocketLaunch";
import {NavLink, useNavigate} from "react-router-dom";

import "./ResponsiveAppBar.css";
import useAuth from "../api/hooks/useAuth";
import LogoutButton from "./LogoutButton";

const pages = [
  {
    name: "Catalog",
    url: "/catalog"
  },
  {
    name: "About",
    url: "/about"
  },
  {
    name: "Contact",
    url: "/contact"
  },
]
const accountMenu = [
  {
    name: "Profile",
    url: "/user/profile"
  },
  {
    name: "My orders",
    url: "/user/my-orders"
  },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {auth, setAuth} = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserAccessClick = () => {
    setAnchorElUser(null);
    navigate('/userAccess')
  };

  return (
    <AppBar position="static" className={"top-app-bar"}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <RocketLaunch sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
          <Typography variant="h6" noWrap component={NavLink} to="/"
                      sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none !important',
                      }}
          >
            PPROMAT
          </Typography>

          {/* Mobile view appbar */}
          <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {xs: 'block', md: 'none'},
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    textAlign="center"
                    component={NavLink}
                    to={page.url}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <> {/* Mobile view Logo */}
            <RocketLaunch sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: {xs: 'flex', md: 'none'},
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              PPROMAT
            </Typography>
          </>


          {/* List of pages. Hidden in xs */}
          <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{my: 2, color: 'white', display: 'block'}}
                component={NavLink}
                to={page.url}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {auth?.user &&
            <Box sx={{flexGrow: 0}}>
              {auth?.user?.username}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0, ml: 1}}>
                  <Avatar alt="User avatar" src={auth?.user?.image}/>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{mt: '45px'}}
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
                {accountMenu.map((item) => (
                  <MenuItem
                    key={item.name}
                    onClick={handleCloseUserMenu}
                    component={NavLink}
                    to={item.url}
                  >
                    <Typography textAlign="center">{item.name}</Typography>
                  </MenuItem>
                ))}
                { auth?.user?.role?.includes("SELLER") &&
                   <MenuItem
                     onClick={handleCloseUserMenu}
                     component={NavLink}
                     to={'/my-events'}
                   >
                     <Typography textAlign="center">My events</Typography>
                   </MenuItem>
                }
                <LogoutButton handleCloseUserMenu={handleCloseUserMenu}/>
              </Menu>
            </Box>
          }

          {!auth?.user &&
            <Button variant='text' color='secondary' onClick={handleUserAccessClick}>
              <Typography>Log in / Register</Typography>
            </Button>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;