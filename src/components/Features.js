import React from 'react';
import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    Paper,
    Divider,
    CircularProgress
} from "@mui/material";
import {
    Store as StoreIcon,
    Assignment as ReportIcon,
    Inventory as InventoryIcon,
    Analytics as AnalyticsIcon,
    Login as LoginIcon,
} from "@mui/icons-material";

const features = [
    {
        title: "Регистрация продаж",
        description: "Быстро регистрируйте продажи с указанием клиента и сотрудника.",
        icon: <StoreIcon fontSize="large" sx={{ color: "#1976d2" }} />,
    },
    {
        title: "Управление товарами",
        description: "Добавляйте, редактируйте и удаляйте товары в удобном интерфейсе.",
        icon: <InventoryIcon fontSize="large" sx={{ color: "#2e7d32" }} />,
    },
    {
        title: "Генерация отчётов",
        description: "Формируйте отчёты по продажам для анализа и отчётности.",
        icon: <ReportIcon fontSize="large" sx={{ color: "#f9a825" }} />,
    },
    {
        title: "Анализ данных",
        description: "Получайте статистику и аналитику по товарам и сотрудникам.",
        icon: <AnalyticsIcon fontSize="large" sx={{ color: "#d32f2f" }} />,
    },
];

const Features = () => {
    return (
        <Box sx={{ bgcolor: "#f5faff", color: "#0a192f", py: 5 }}>
            <Container>
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ fontWeight: "bold", mb: 4 }}
                >
                    Возможности приложения
                </Typography>
                <Grid container spacing={8} justifyContent="center">
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}>
                            <Paper
                                sx={{
                                    p: 5,
                                    width: "100%",
                                    maxWidth: "400px",
                                    height: "100%",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    '&:hover': {
                                        transform: "translateY(-5px)",
                                        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                                    },
                                    borderRadius: 3,
                                    background: "#ffffff",
                                }}
                                elevation={3}
                            >
                                <Box display="flex" alignItems="center" mb={2}>
                                    {feature.icon}
                                    <Typography variant="h6" ml={2} sx={{ fontWeight: 600 }}>
                                        {feature.title}
                                    </Typography>
                                </Box>
                                <Typography variant="body1" sx={{ opacity: 0.8 }}>
                                    {feature.description}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    )
}
export default Features;