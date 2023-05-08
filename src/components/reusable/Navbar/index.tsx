import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IMG_PATH } from "config/img_path";
import navigation from "config/navigation";
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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
