import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import AddBoxIcon from "@mui/icons-material/AddBox";
import HomeIcon from "@mui/icons-material/Home";
import StroreIcon from "@mui/icons-material/Storefront";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";

import logo from '../images/logo.png';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const isLoggedIn = !!localStorage.getItem("token");

    return (
        <AppBar position="static" sx={{ bgcolor: "#1a1a1a", boxShadow: "0 4px 10px rgba(0,0,0,0.5)" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box display="flex" alignItems="center" gap={1}>
                    {/* <StoreIcon sx={{ color: "#42a5f5", fontSize: 32 }} /> */}
                    <img
                        src={logo}
                        alt="Логотип ElectroStore"
                        style={{ width: 60, height: 60 }}
                    />
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: "none",
                            color: "#fff",
                            fontWeight: 700,
                            letterSpacing: 1.5,
                        }}
                    >
                        ElectroStore
                    </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap={2}>
                    <Tooltip title="Главная" arrow>
                        <IconButton component={Link} to="/" sx={{ color: "#fff" }}>
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Покупки" arrow>
                        <IconButton component={Link} to="/api/purchases" sx={{ color: "#fff" }}>
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>

                    {isLoggedIn && (
                        <Tooltip title="Товары" arrow>
                            <IconButton component={Link} to="/products" sx={{ color: "#fff" }}>
                                <StoreIcon />
                            </IconButton>
                        </Tooltip>
                    )}

                    {isLoggedIn && (
                        <Tooltip title="Покупатели" arrow>
                            <IconButton component={Link} to="/customers" sx={{ color: "#fff" }}>
                                <PeopleIcon />
                            </IconButton>
                        </Tooltip>
                    )}

                    {isLoggedIn && (
                        <Tooltip title="Добавить товар" arrow>
                            <IconButton component={Link} to="/addproduct" sx={{ color: "#fff" }}>
                                <AddBoxIcon />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>

                {isLoggedIn ? (
                    <Button
                        onClick={handleLogout}
                        variant="outlined"
                        color="inherit"
                        startIcon={<LogoutIcon />}
                        sx={{
                            borderColor: "#42a5f5",
                            color: "#fff",
                            "&:hover": {
                                bgcolor: "rgba(70, 130, 180, 0.1)",
                                transform: "translateY(-1px)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        Выйти
                    </Button>
                ) : (
                    <Button
                        component={Link}
                        to="/login"
                        variant="contained"
                        startIcon={<LoginIcon />}
                        sx={{
                            bgcolor: "#42a5f5",
                            color: "#fff",
                            "&:hover": {
                                bgcolor: "#1a7ccc",
                                transform: "translateY(-1px)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        Войти
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;

