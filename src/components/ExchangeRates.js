import React, { useEffect, useState } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Paper,
    Divider,
    CircularProgress
} from "@mui/material";

const ExchangeRates = () => {
    const [exchangeRates, setExchangeRates] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API_URL = "https://v6.exchangerate-api.com/v6/b1d8ef7c88bc55ed2e06f64d/latest/USD";

        const fetchExchangeRates = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setExchangeRates(data.conversion_rates);
            } catch (error) {
                console.error("Ошибка при получении данных о курсах валют:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExchangeRates();
    }, []);

    return (
        <Box sx={{
            bgcolor: "#0a192f",
            py: 8,
            borderTop: "1px solid rgba(255,255,255,0.1)",
            borderBottom: "1px solid rgba(255,255,255,0.1)"
        }}>
            <Container maxWidth="md">
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight: 700,
                        mb: 6,
                        color: "#fff",
                        position: "relative",
                        "&:after": {
                            content: '""',
                            display: "block",
                            width: "100px",
                            height: "4px",
                            background: "linear-gradient(90deg, #9c27b0, #2196f3, #4caf50)",
                            margin: "16px auto 0",
                            borderRadius: "2px"
                        }
                    }}
                >
                    Курсы валют
                </Typography>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                        <CircularProgress sx={{ color: "#4caf50" }} />
                    </Box>
                ) : (
                    <Grid container spacing={4} justifyContent="center">

                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{
                                p: 3,
                                textAlign: "center",
                                bgcolor: "rgba(10, 25, 47, 0.7)",
                                backdropFilter: "blur(8px)",
                                borderRadius: 3,
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 10px 25px rgba(156, 39, 176, 0.3)",
                                    borderColor: "#9c27b0"
                                }
                            }}>
                                <Typography variant="h6" sx={{ color: "#9c27b0", mb: 1 }}>
                                    Белорусский рубль
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                    1 USD
                                </Typography>
                                <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 2 }} />
                                <Typography variant="h5" sx={{ color: "#fff" }}>
                                    = {exchangeRates?.BYN?.toFixed(4)} BYN
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{
                                p: 3,
                                textAlign: "center",
                                bgcolor: "rgba(10, 25, 47, 0.7)",
                                backdropFilter: "blur(8px)",
                                borderRadius: 3,
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 10px 25px rgba(33, 150, 243, 0.3)",
                                    borderColor: "#2196f3"
                                }
                            }}>
                                <Typography variant="h6" sx={{ color: "#2196f3", mb: 1 }}>
                                    Российский рубль
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                    1 USD
                                </Typography>
                                <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 2 }} />
                                <Typography variant="h5" sx={{ color: "#fff" }}>
                                    = {exchangeRates?.RUB?.toFixed(2)} RUB
                                </Typography>
                            </Paper>
                        </Grid>

                        <Grid item xs={12} sm={6} md={4}>
                            <Paper sx={{
                                p: 3,
                                textAlign: "center",
                                bgcolor: "rgba(10, 25, 47, 0.7)",
                                backdropFilter: "blur(8px)",
                                borderRadius: 3,
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 10px 25px rgba(76, 175, 80, 0.3)",
                                    borderColor: "#4caf50"
                                }
                            }}>
                                <Typography variant="h6" sx={{ color: "#4caf50", mb: 1 }}>
                                    Евро
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                    1 USD
                                </Typography>
                                <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)", my: 2 }} />
                                <Typography variant="h5" sx={{ color: "#fff" }}>
                                    = {exchangeRates?.EUR?.toFixed(4)} EUR
                                </Typography>
                            </Paper>
                        </Grid>

                    </Grid>
                )}

                <Typography variant="body2" align="center" sx={{
                    mt: 4,
                    color: "rgba(255,255,255,0.6)",
                    fontStyle: "italic"
                }}>
                    Курсы обновляются ежедневно
                </Typography>
            </Container>
        </Box>
    )
}
export default ExchangeRates;