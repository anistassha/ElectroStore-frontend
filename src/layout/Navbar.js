import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import StoreIcon from "@mui/icons-material/Store";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import PeopleIcon from "@mui/icons-material/People";
import Money from "@mui/icons-material/AttachMoney";
import DownloadIcon from "@mui/icons-material/Download";
import AdminIcon from '@mui/icons-material/AdminPanelSettings';

import logo from '../images/logo.png';

import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUserRoleFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = jwtDecode(token);
    return decoded?.role;
};

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const isLoggedIn = !!localStorage.getItem("token");
    const currentUserRole = getUserRoleFromToken();

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

                    {isLoggedIn && currentUserRole === 'ADMIN' && (
                        <Tooltip title="Сотрудники" arrow>
                            <IconButton component={Link} to="/employees" sx={{ color: "#fff" }}>
                                <AdminIcon />
                            </IconButton>
                        </Tooltip>
                    )}

                    {isLoggedIn && currentUserRole === 'ADMIN' && (
                        <Tooltip title="Отчеты" arrow>
                            <IconButton component={Link} to="/reports" sx={{ color: "#fff" }}>
                                <DownloadIcon />
                            </IconButton>
                        </Tooltip>
                    )}

                    {isLoggedIn && (
                        <Tooltip title="Продажи" arrow>
                            <IconButton component={Link} to="/api/purchases" sx={{ color: "#fff" }}>
                                <Money />
                            </IconButton>
                        </Tooltip>
                    )}

                    {isLoggedIn && currentUserRole === 'ADMIN' && (
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