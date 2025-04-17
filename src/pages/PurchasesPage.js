import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    TextField,
    Autocomplete,
    Button,
    Snackbar,
    Alert,
    Paper,
    Typography,
    Box,
} from "@mui/material";

const PurchasesPage = () => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        productId: "",
        customerId: "",
        userId: 1, // временно захардкожено
        quantity: 1,
        date: new Date().toISOString().split("T")[0],
        payAmount: 0,
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        axios.get("http://localhost:8080/products").then((res) => setProducts(res.data));
        axios.get("http://localhost:8080/customers").then((res) => setCustomers(res.data));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        const newFormData = {
            ...formData,
            [name]: name === "quantity" ? parseInt(value, 10) : value,
        };

        updatePayAmount(newFormData);
    };

    const updatePayAmount = (data) => {
        const selectedProduct = products.find((p) => p.productId === parseInt(data.productId)) || {};
        const qty = data.quantity || 1;
        const payAmount = selectedProduct.price ? selectedProduct.price * qty : 0;

        setFormData({ ...data, payAmount });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:8080/api/purchases", {
                product: { productId: parseInt(formData.productId) },
                customer: { customerId: parseInt(formData.customerId) },
                user: { id: parseInt(formData.userId) },
                date: formData.date,
                quantity: formData.quantity,
                payAmount: formData.payAmount,
            })
            .then(() => {
                axios.get("http://localhost:8080/products")
                    .then((res) => {
                        setProducts(res.data);
                        setSnackbar({
                            open: true,
                            message: "Покупка успешно зарегистрирована!",
                            severity: "success"
                        });
                        setFormData({
                            productId: "",
                            customerId: "",
                            userId: 1,
                            quantity: 1,
                            date: new Date().toISOString().split("T")[0],
                            payAmount: 0,
                        });
                    });
            })
            .catch((err) => {
                const errMsg = err.response?.data || "Ошибка при регистрации покупки.";
                setSnackbar({ open: true, message: errMsg, severity: "error" });
            });
    };

    return (
        <Paper elevation={6} sx={{ maxWidth: 500, margin: "2rem auto", p: 4, borderRadius: 4 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Регистрация продажи
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

                <Autocomplete
                    options={products}
                    value={products.find((product) => product.productId === formData.productId) || null}
                    getOptionLabel={(option) => `${option.productName} (на складе: ${option.stockQuantity})`}
                    onChange={(e, value) => {
                        const updated = { ...formData, productId: value?.productId || "" };
                        updatePayAmount(updated);
                    }}
                    renderInput={(params) => <TextField {...params} label="Товар" required />}
                    PaperComponent={({ children }) => (
                        <Paper
                            sx={{
                                mt: 1,
                                transformOrigin: 'top center !important',
                                animation: 'growDown 300ms ease-in-out forwards'
                            }}
                        >
                            {children}
                        </Paper>
                    )}
                />

                <Autocomplete
                    options={customers}
                    value={customers.find((customer) => customer.customerId === formData.customerId) || null}
                    getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                    onChange={(e, value) =>
                        setFormData({ ...formData, customerId: value?.customerId || "" })
                    }
                    renderInput={(params) => <TextField {...params} label="Клиент" required />}
                    PaperComponent={({ children }) => (
                        <Paper
                            sx={{
                                mt: 1,
                                transformOrigin: 'top center !important',
                                animation: 'growDown 300ms ease-in-out forwards'
                            }}
                        >
                            {children}
                        </Paper>
                    )}
                />

                <TextField
                    label="Количество"
                    name="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={handleChange}
                    inputProps={{ min: 1 }}
                    required
                />

                <TextField
                    label="Дата"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                />

                <Typography>
                    💰 <strong>Сумма к оплате:</strong> {formData.payAmount.toFixed(2)} BYN
                </Typography>

                <Button type="submit" variant="contained" color="primary">
                    Зарегистрировать
                </Button>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Paper >
    );
};

export default PurchasesPage;