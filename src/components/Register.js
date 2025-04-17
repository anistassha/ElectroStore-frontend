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
    Person as PersonIcon,
    Lock as LockIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Badge as BadgeIcon,
    PersonAdd as PersonAddIcon,
    ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        surname: "",
        email: "",
        telephoneNumber: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (fieldErrors[name]) {
            setFieldErrors({ ...fieldErrors, [name]: "" });
        }
        setError("");
    };

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            errors.name = "Введите имя";
            isValid = false;
        }
        if (!formData.surname.trim()) {
            errors.surname = "Введите фамилию";
            isValid = false;
        }
        if (!formData.email.trim()) {
            errors.email = "Введите email";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "Введите корректный email";
            isValid = false;
        }
        if (!formData.telephoneNumber.trim()) {
            errors.telephoneNumber = "Введите телефон";
            isValid = false;
        }
        if (!formData.username.trim()) {
            errors.username = "Введите имя пользователя";
            isValid = false;
        }
        if (!formData.password) {
            errors.password = "Введите пароль";
            isValid = false;
        } else if (formData.password.length < 6) {
            errors.password = "Пароль должен содержать минимум 6 символов";
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await API.post("/auth/register", formData);
            setSuccess("Регистрация прошла успешно! Перенаправляем...");

            setTimeout(() => {
                navigate("/login", {
                    state: { successMessage: "Регистрация прошла успешно! Теперь вы можете войти." }
                });
            }, 3000);
        } catch (err) {
            const errorMessage = err.response?.data || "Произошла ошибка при регистрации";
            setError(errorMessage);

            if (errorMessage.includes("Имя пользователя")) {
                setFieldErrors({ ...fieldErrors, username: errorMessage });
            } else if (errorMessage.includes("Email")) {
                setFieldErrors({ ...fieldErrors, email: errorMessage });
            }
        } finally {
            setLoading(false);
        }
    };

    const fieldStyles = {
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
            fontSize: '0.85rem',
        },
        "& .MuiInputBase-input": {
            py: 1.1,
            fontSize: '0.9rem',
        },
        margin: '0.4rem 0',
        maxWidth: '400px',
        width: '100%',
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
                py: 3,
            }}
        >
            <CssBaseline />
            <Container maxWidth="sm" sx={{ padding: '0 16px' }}>
                <Paper
                    elevation={10}
                    sx={{
                        p: 3,
                        borderRadius: 2,
                        bgcolor: "rgba(30, 30, 30, 0.9)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box textAlign="center" mb={2} sx={{ width: '100%' }}>
                        <PersonAddIcon sx={{
                            fontSize: 42,
                            color: "#4caf50",
                            mb: 0.8
                        }} />
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                color: "#fff",
                                fontWeight: 700,
                                letterSpacing: 1,
                                fontSize: '1.8rem',
                                mb: 0.5
                            }}
                        >
                            Регистрация сотрудника
                        </Typography>
                        <Typography variant="body2" sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: '0.85rem'
                        }}>
                            Заполните все поля для создания аккаунта
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{
                            mb: 2,
                            py: 0.5,
                            fontSize: '0.85rem',
                            width: '100%',
                            maxWidth: '400px'
                        }}>
                            {error}
                        </Alert>
                    )}

                    {success && (
                        <Alert severity="success" sx={{
                            mb: 2,
                            py: 0.5,
                            fontSize: '0.85rem',
                            width: '100%',
                            maxWidth: '400px'
                        }}>
                            {success}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <TextField
                            margin="dense"
                            required
                            label="Имя"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!fieldErrors.name}
                            helperText={fieldErrors.name}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeIcon sx={{
                                            color: "rgba(255,255,255,0.7)",
                                            fontSize: 20
                                        }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={fieldStyles}
                        />

                        <TextField
                            margin="dense"
                            required
                            label="Фамилия"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            error={!!fieldErrors.surname}
                            helperText={fieldErrors.surname}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <BadgeIcon sx={{
                                            color: "rgba(255,255,255,0.7)",
                                            fontSize: 20
                                        }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={fieldStyles}
                        />

                        <TextField
                            margin="dense"
                            required
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!fieldErrors.email}
                            helperText={fieldErrors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon sx={{
                                            color: "rgba(255,255,255,0.7)",
                                            fontSize: 20
                                        }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={fieldStyles}
                        />

                        <TextField
                            margin="dense"
                            required
                            label="Телефон"
                            name="telephoneNumber"
                            value={formData.telephoneNumber}
                            onChange={handleChange}
                            error={!!fieldErrors.telephoneNumber}
                            helperText={fieldErrors.telephoneNumber}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneIcon sx={{
                                            color: "rgba(255,255,255,0.7)",
                                            fontSize: 20
                                        }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={fieldStyles}
                        />

                        <TextField
                            margin="dense"
                            required
                            label="Имя пользователя"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            error={!!fieldErrors.username}
                            helperText={fieldErrors.username}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon sx={{
                                            color: "rgba(255,255,255,0.7)",
                                            fontSize: 20
                                        }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={fieldStyles}
                        />

                        <TextField
                            margin="dense"
                            required
                            name="password"
                            label="Пароль"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            error={!!fieldErrors.password}
                            helperText={fieldErrors.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon sx={{
                                            color: "rgba(255,255,255,0.7)",
                                            fontSize: 20
                                        }} />
                                    </InputAdornment>
                                ),
                            }}
                            sx={fieldStyles}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                mt: 2,
                                mb: 1.5,
                                py: 1.2,
                                bgcolor: "#4caf50",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#4caf50",
                                    bgcolor: "#3d8b40",
                                    transform: "translateY(-2px)",
                                },
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                width: '100%',
                                maxWidth: '400px'
                            }}
                            disabled={loading}
                            startIcon={loading ?
                                <CircularProgress size={18} /> :
                                <PersonAddIcon sx={{ fontSize: 20 }} />
                            }
                        >
                            {loading ? "Регистрируем..." : "Зарегистрироваться"}
                        </Button>

                        <Divider sx={{
                            my: 1.5,
                            borderColor: "rgba(255,255,255,0.1)",
                            width: '100%',
                            maxWidth: '400px'
                        }} />

                        <Button
                            component={Link}
                            to="/login"
                            variant="outlined"
                            sx={{
                                py: 0.9,
                                fontSize: '0.85rem',
                                borderColor: "rgba(255,255,255,0.2)",
                                color: "#fff",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#4caf50",
                                    backgroundColor: "rgba(76, 175, 80, 0.1)",
                                    transform: "translateY(-2px)",
                                },
                                width: '100%',
                                maxWidth: '400px'
                            }}
                            startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
                        >
                            Уже есть аккаунт? Войти
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Register;