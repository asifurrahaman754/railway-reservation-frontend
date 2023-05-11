import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { IMG_PATH } from "config/img_path";
import navigation, { dropDownNavigation } from "config/navigation";
import { useState } from "react";

const style = {
  appbarStyle: {
    backgroundColor: "white",
    color: "black",
    padding: ".6rem 0",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.06)",
  },
  smallMenuStyle: { display: { xs: "flex", sm: "none" }, marginLeft: "auto" },
  bigMenuStyle: {
    marginLeft: "auto",
    display: { xs: "none", sm: "flex" },
    alignItems: "center",
  },
  bigMenuItemStyle: { my: 2, display: "block", fontSize: ".9rem" },
};

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static" style={style.appbarStyle}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <img src={`${IMG_PATH}/logo.png`} alt="logo" width="60px" />

          {/* menu for mobile */}
          <Box sx={{ ...style.smallMenuStyle }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {navigation.map(({ name }) => (
                <MenuItem key={name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* menu for desktop */}
          <Box sx={{ ...style.bigMenuStyle }}>
            {navigation.map(({ name }) => (
              <Button
                key={name}
                onClick={handleCloseNavMenu}
                sx={{ ...style.bigMenuItemStyle }}
              >
                {name}
              </Button>
            ))}
          </Box>

          {/* menu for user profile  */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="user profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Asifur" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{
                mt: "45px",
              }}
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Typography
                padding="1rem"
                textAlign="center"
                variant="h5"
                fontWeight={500}
              >
                Asifur Rahamn
              </Typography>
              <Divider />

              {dropDownNavigation.map(({ name, icon }) => (
                <MenuItem
                  key={name}
                  onClick={handleCloseNavMenu}
                  sx={{ py: ".8rem" }}
                >
                  <Box
                    color="#000000ab"
                    marginRight="1rem"
                    display="flex"
                    alignItems="center"
                  >
                    {icon}
                  </Box>
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
