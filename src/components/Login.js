import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Alert,
    CircularProgress,
    InputAdornment,
    CssBaseline,
    Divider,
} from "@mui/material";
import {
    Lock as LockIcon,
    Person as PersonIcon,
    Login as LoginIcon,
    PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await API.post("/auth/login", formData);
            localStorage.setItem("token", response.data);
            navigate("/");
        } catch (err) {
            setError(
                err.response?.data?.message || "Неверное имя пользователя или пароль"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "92.5vh",
                background: `
          linear-gradient(135deg, #2c3e50 0%, #1a1a1a 100%),
          repeating-linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.05) 0px,
            rgba(255, 255, 255, 0.05) 2px,
            transparent 2px,
            transparent 4px
          )
        `,
                backgroundBlendMode: "overlay",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignItems: "flex-start",
                py: 4,
            }}
        >
            <CssBaseline />
            <Container maxWidth="xs">
                <Paper
                    elevation={10}
                    sx={{
                        p: 4,
                        borderRadius: 2,
                        bgcolor: "rgba(30, 30, 30, 0.9)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                >
                    <Box textAlign="center" mb={3}>
                        <LockIcon sx={{ fontSize: 50, color: "#4caf50", mb: 1 }} />
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                color: "#fff",
                                fontWeight: 700,
                                letterSpacing: 1,
                            }}
                        >
                            Добро пожаловать
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                            Введите свои учетные данные
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Имя пользователя"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={formData.username}
                            onChange={handleChange}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "#fff",
                                    "& fieldset": {
                                        borderColor: "rgba(255, 255, 255, 0.23)",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#4caf50",
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: "rgba(255, 255, 255, 0.7)",
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Пароль"
                            type="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    color: "#fff",
                                    "& fieldset": {
                                        borderColor: "rgba(255, 255, 255, 0.23)",
                                    },
                                    "&:hover fieldset": {
                                        borderColor: "#4caf50",
                                    },
                                },
                                "& .MuiInputLabel-root": {
                                    color: "rgba(255, 255, 255, 0.7)",
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{ color: "rgba(255,255,255,0.7)" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                bgcolor: "#4caf50",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#4caf50",
                                    bgcolor: "#3d8b40",
                                    transform: "translateY(-2px)",
                                },

                                fontSize: "1rem",
                                fontWeight: 600,
                            }}
                            disabled={loading}
                            startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
                        >
                            {loading ? "Входим..." : "Войти"}
                        </Button>

                        <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

                        <Typography
                            variant="body2"
                            align="center"
                            sx={{
                                color: "rgba(255,255,255,0.7)",
                                mb: 2
                            }}
                        >
                            Еще нет аккаунта?
                        </Typography>

                        <Button
                            component={Link}
                            to="/register"
                            fullWidth
                            variant="outlined"
                            sx={{
                                py: 1.5,
                                borderColor: "rgba(255,255,255,0.2)",
                                color: "#fff",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#4caf50",
                                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                                    transform: "translateY(-2px)",
                                },
                                fontSize: "0.875rem",
                                fontWeight: 500,
                            }}
                            startIcon={<PersonAddIcon />}
                        >
                            Зарегистрироваться
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;