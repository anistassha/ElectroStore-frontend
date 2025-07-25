// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//     TextField,
//     Autocomplete,
//     Button,
//     Snackbar,
//     Alert,
//     Paper,
//     Typography,
//     Box,
// } from "@mui/material";

// import { getUserIdFromToken } from "../utils/jwt";

// const PurchasesPage = () => {
//     const [products, setProducts] = useState([]);
//     const [customers, setCustomers] = useState([]);
//     const [formData, setFormData] = useState({
//         productId: "",
//         customerId: "",
//         userId: "",
//         quantity: 1,
//         date: new Date().toISOString().split("T")[0],
//         payAmount: 0,
//     });

//     const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//     useEffect(() => {
//         const userId = getUserIdFromToken();
//         setFormData(prev => ({ ...prev, userId }));

//         axios.get("http://localhost:8080/products").then((res) => setProducts(res.data));
//         axios.get("http://localhost:8080/customers").then((res) => setCustomers(res.data));
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         const newFormData = {
//             ...formData,
//             [name]: name === "quantity" ? parseInt(value, 10) : value,
//         };

//         updatePayAmount(newFormData);
//     };

//     const updatePayAmount = (data) => {
//         const selectedProduct = products.find((p) => p.productId === parseInt(data.productId)) || {};
//         const qty = data.quantity || 1;
//         const payAmount = selectedProduct.price ? selectedProduct.price * qty : 0;

//         setFormData({ ...data, payAmount });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         axios
//             .post("http://localhost:8080/api/purchases", {
//                 product: { productId: parseInt(formData.productId) },
//                 customer: { customerId: parseInt(formData.customerId) },
//                 user: { id: parseInt(formData.userId) },
//                 date: formData.date,
//                 quantity: formData.quantity,
//                 payAmount: formData.payAmount,
//             })
//             .then(() => {
//                 axios.get("http://localhost:8080/products")
//                     .then((res) => {
//                         setProducts(res.data);
//                         setSnackbar({
//                             open: true,
//                             message: "Продажа успешно зарегистрирована!",
//                             severity: "success"
//                         });
//                         setFormData({
//                             productId: "",
//                             customerId: "",
//                             userId: formData.userId,
//                             quantity: 1,
//                             date: new Date().toISOString().split("T")[0],
//                             payAmount: 0,
//                         });
//                     });
//             })
//             .catch((err) => {
//                 const errMsg = err.response?.data || "Ошибка при регистрации продажи.";
//                 setSnackbar({ open: true, message: errMsg, severity: "error" });
//             });
//     };

//     return (
//         <Paper elevation={6} sx={{ maxWidth: 500, margin: "2rem auto", p: 4, borderRadius: 4 }}>
//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//                 Регистрация продажи
//             </Typography>

//             <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>

//                 <Autocomplete
//                     options={products}
//                     value={products.find((product) => product.productId === formData.productId) || null}
//                     getOptionLabel={(option) => `${option.productName} (на складе: ${option.stockQuantity})`}
//                     onChange={(e, value) => {
//                         const updated = { ...formData, productId: value?.productId || "" };
//                         updatePayAmount(updated);
//                     }}
//                     renderInput={(params) => <TextField {...params} label="Товар" required />}
//                     PaperComponent={({ children }) => (
//                         <Paper
//                             sx={{
//                                 mt: 1,
//                                 transformOrigin: 'top center !important',
//                                 animation: 'growDown 300ms ease-in-out forwards'
//                             }}
//                         >
//                             {children}
//                         </Paper>
//                     )}
//                 />

//                 <Autocomplete
//                     options={customers}
//                     value={customers.find((customer) => customer.customerId === formData.customerId) || null}
//                     getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
//                     onChange={(e, value) =>
//                         setFormData({ ...formData, customerId: value?.customerId || "" })
//                     }
//                     renderInput={(params) => <TextField {...params} label="Клиент" required />}
//                     PaperComponent={({ children }) => (
//                         <Paper
//                             sx={{
//                                 mt: 1,
//                                 transformOrigin: 'top center !important',
//                                 animation: 'growDown 300ms ease-in-out forwards'
//                             }}
//                         >
//                             {children}
//                         </Paper>
//                     )}
//                 />

//                 <TextField
//                     label="Количество"
//                     name="quantity"
//                     type="number"
//                     value={formData.quantity}
//                     onChange={handleChange}
//                     inputProps={{ min: 1 }}
//                     required
//                 />

//                 <TextField
//                     label="Дата"
//                     name="date"
//                     type="date"
//                     value={formData.date}
//                     onChange={handleChange}
//                     InputLabelProps={{ shrink: true }}
//                     required
//                 />

//                 <Typography>
//                     💰 <strong>Сумма к оплате:</strong> {formData.payAmount.toFixed(2)} BYN
//                 </Typography>

//                 <Button type="submit" variant="contained" color="primary">
//                     Зарегистрировать
//                 </Button>
//             </Box>

//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={4000}
//                 onClose={() => setSnackbar({ ...snackbar, open: false })}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//             >
//                 <Alert
//                     onClose={() => setSnackbar({ ...snackbar, open: false })}
//                     severity={snackbar.severity}
//                     variant="filled"
//                     sx={{ width: "100%" }}
//                 >
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Paper >
//     );
// };

// export default PurchasesPage;

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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

import { getUserIdFromToken } from "../utils/jwt";

const PurchasesPage = () => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        productId: "",
        customerId: "",
        userId: "",
        quantity: 1,
        date: new Date().toISOString().split("T")[0],
        payAmount: 0,
    });

    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

    useEffect(() => {
        const userId = getUserIdFromToken();
        setFormData(prev => ({ ...prev, userId }));

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
            .then((res) => {
                setSnackbar({
                    open: true,
                    message: "Продажа успешно зарегистрирована! Чек доступен для печати.",
                    severity: "success"
                });

                axios.get("http://localhost:8080/products")
                    .then((res) => {
                        setProducts(res.data);
                        setFormData({
                            productId: "",
                            customerId: "",
                            userId: formData.userId,
                            quantity: 1,
                            date: new Date().toISOString().split("T")[0],
                            payAmount: 0,
                        });
                    });

                const purchaseId = res.data.purchaseId;
                setTimeout(() => {
                    const receiptUrl = `http://localhost:8080/api/purchases/${purchaseId}/receipt`;
                    window.open(receiptUrl, "_blank");
                }, 2000);
            })
            .catch((err) => {
                const errMsg = err.response?.data || "Ошибка при регистрации продажи.";
                setSnackbar({ open: true, message: errMsg, severity: "error" });
            });
    };

    return (

        <Box
            sx={{
                minHeight: "92vh",
                background: "linear-gradient(to right, #a18cd1, #fbc2eb)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 2
            }}
        >

            <Paper elevation={10} sx={{ maxWidth: 500, width: "100%", p: 4, borderRadius: 6 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom display="flex" alignItems="center" gap={1}>
                    <ShoppingCartIcon color="secondary" /> Регистрация продажи
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
                        inputProps={{
                            max: new Date().toISOString().split("T")[0]
                        }}
                        required
                    />

                    <Typography fontWeight="medium" display="flex" alignItems="center" gap={1}>
                        <AttachMoneyIcon color="success" />
                        <strong>Сумма к оплате:</strong> {formData.payAmount.toFixed(2)} BYN
                    </Typography>

                    <Button type="submit" variant="contained" color="secondary" size="large" sx={{ borderRadius: 3 }}>
                        Зарегистрировать продажу
                    </Button>
                </Box>

                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={4000}
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
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

                <Box mt={3} display="flex" justifyContent="center">
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<InsertChartOutlinedIcon />}
                        sx={{
                            borderRadius: 3,
                            textTransform: "none",
                            fontWeight: "bold",
                            px: 3,
                            py: 1,
                            boxShadow: 2,
                            transition: "0.3s",
                            ":hover": {
                                backgroundColor: "#f48fb1",
                                color: "#fff"
                            }
                        }}
                        onClick={() => window.location.href = "/api/purchases/report"}
                    >
                        Отчёт по моим продажам
                    </Button>
                </Box>

            </Paper>
        </Box>
    );
};

export default PurchasesPage;
