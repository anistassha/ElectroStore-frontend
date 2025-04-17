import React from 'react';
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Typography,
    Divider,
} from "@mui/material";
import {
    Login as LoginIcon,
} from "@mui/icons-material";
import logoImage from "../images/logo.png";
import Features from "../components/Features";
import ExchangeRates from '../components/ExchangeRates';

const Home = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ fontFamily: "'Segoe UI', 'Roboto', sans-serif" }}>

            <Box
                sx={{
                    backgroundImage: "linear-gradient(135deg, #0a192f 0%, #122c4a 100%)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 6,
                    py: 10,
                    px: 4,
                    minHeight: "92vh",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                }}
            >

                <Box
                    sx={{
                        maxWidth: "600px",
                        animation: "fadeInLeft 1s ease-out",
                    }}
                >
                    <Typography
                        variant="h2"
                        gutterBottom
                        sx={{
                            fontWeight: "bold",
                            textShadow: "2px 2px 6px #000",
                            fontSize: { xs: "2rem", md: "3.5rem" },
                        }}
                    >
                        ElectroStore
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            opacity: 0.9,
                            fontSize: { xs: "1rem", md: "1.25rem" },
                            lineHeight: 1.6,
                            mt: 2,
                        }}
                    >
                        Удобное веб-приложение для учёта и анализа продаж в магазине электротоваров.
                    </Typography>
                </Box>

                <Box
                    component="img"
                    src={logoImage}
                    alt="Логотип"
                    sx={{
                        width: "300px",
                        transform: "rotate(-5deg) translateY(-10px)",
                        transition: "transform 0.5s",
                        '&:hover': {
                            transform: "rotate(0deg) scale(1.05)",
                        },
                        borderRadius: 2,
                        mt: { xs: 4, md: 0 },
                        boxShadow: "0 0 30px rgba(255,255,255,0.4)",
                        animation: "fadeInRight 1s ease-out",
                    }}
                />
            </Box>

            <Box sx={{ bgcolor: "#f5faff", color: "#0a192f", py: 1 }}>
                <Divider sx={{ my: 4, borderColor: "#1976d2", mx: "auto", width: "60%" }} />
            </Box>

            {/* <Divider sx={{ bgcolor: "#1976d2", height: 6 }} />  */}

            <Features />

            <Box sx={{ bgcolor: "#e3f2fd", py: 6, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
                    Чтобы получить доступ к функциям, выполните вход в систему
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<LoginIcon />}
                    onClick={() => navigate("/login")}
                    sx={{
                        mt: 3,
                        px: 5,
                        py: 1.5,
                        fontSize: "1rem",
                        fontWeight: 600,
                        bgcolor: "#1976d2",
                        borderRadius: "30px",
                        textTransform: "none",
                        transition: "transform 0.3s",
                        '&:hover': {
                            bgcolor: "#1565c0",
                            transform: "scale(1.05)",
                        },
                        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                    }}
                >
                    Перейти к авторизации
                </Button>
            </Box>

            <ExchangeRates />

        </Box>
    );
};

export default Home;
