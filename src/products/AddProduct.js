// import axios from 'axios';
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';

// export default function AddProduct() {

//     let navigate = useNavigate()

//     const [product, setProduct] = useState({
//         productName: "",
//         productCategory: "",
//         manufacturer: "",
//         price: "",
//         stockQuantity: ""
//     })

//     const { productName, productCategory, manufacturer, price, stockQuantity } = product

//     const onInputChange = (e) => {
//         setProduct({ ...product, [e.target.name]: e.target.value });
//     };

//     const onFileChange = async (e) => {
//         const file = e.target.files[0];
//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await axios.post("http://localhost:8080/upload", formData, {
//                 headers: { "Content-Type": "multipart/form-data" }
//             });

//             setProduct({ ...product, image: response.data }); // Сохраняем URL загруженного файла
//         } catch (error) {
//             console.error("Ошибка загрузки файла", error);
//         }
//     };

//     const onSubmit = async (e) => {
//         e.preventDefault();
//         await axios.post("http://localhost:8080/product", product)
//         navigate("/")
//     };

//     return <div className='container'>
//         <div className='row'>
//             <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
//                 <h2 className='text-center m-4'>Добавление товара</h2>

//                 <form onSubmit={(e) => onSubmit(e)}>

//                     <div className='mb-3'>
//                         <label htmlFor='image' className='form-label'>Загрузить изображение</label>
//                         <input type="file" className='form-control' onChange={onFileChange} />
//                     </div>


//                     <div className='mb-3'>
//                         <label htmlFor='productName' className='form-label'>
//                             Название
//                         </label>
//                         <input type={'text'} className='form-control' placeholder='Введите название товара' name='productName' value={productName} onChange={(e) => onInputChange(e)} />
//                     </div>

//                     <div className='mb-3'>
//                         <label htmlFor='productCategory' className='form-label'>
//                             Категория
//                         </label>
//                         <input type={'text'} className='form-control' placeholder='Введите категорию товара' name='productCategory' value={productCategory} onChange={(e) => onInputChange(e)} />
//                     </div>

//                     <div className='mb-3'>
//                         <label htmlFor='manufacturer' className='form-label'>
//                             Производитель
//                         </label>
//                         <input type={'text'} className='form-control' placeholder='Введите производителя товара' name='manufacturer' value={manufacturer} onChange={(e) => onInputChange(e)} />
//                     </div>

//                     <div className='mb-3'>
//                         <label htmlFor='price' className='form-label'>
//                             Цена
//                         </label>
//                         <input type={'text'} className='form-control' placeholder='Введите цену товара' name='price' value={price} onChange={(e) => onInputChange(e)} />
//                     </div>

//                     <div className='mb-3'>
//                         <label htmlFor='stockQuantity' className='form-label'>
//                             Количество
//                         </label>
//                         <input type={'text'} className='form-control' placeholder='Введите остаток товара на складе' name='stockQuantity' value={stockQuantity} onChange={(e) => onInputChange(e)} />
//                     </div>

//                     <button type='submit' className="btn btn-outline-primary">Добавить</button>
//                     <Link className="btn btn-outline-danger mx-2" to="/">Назад</Link>

//                 </form>
//             </div>
//         </div>
//     </div>;

// }

import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
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
} from '@mui/material';
import {
    Add as AddIcon,
    ArrowBack as ArrowBackIcon,
    Image as ImageIcon,
    Category as CategoryIcon,
    Factory as FactoryIcon,
    AttachMoney as AttachMoneyIcon,
    Storage as StorageIcon,
} from '@mui/icons-material';

import backgroundImage from '../images/back-add-prod.jpg';

export default function AddProduct() {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        productName: "",
        productCategory: "",
        manufacturer: "",
        price: "",
        stockQuantity: "",
        image: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
        if (fieldErrors[name]) {
            setFieldErrors({ ...fieldErrors, [name]: null });
        }
        setError("");
    };

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8080/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setProduct({ ...product, image: response.data });
            setSuccess("Изображение успешно загружено");
        } catch (err) {
            setError("Ошибка загрузки изображения");
        } finally {
            setLoading(false);
        }
    };

    const validateFields = () => {
        const errors = {};
        let isValid = true;

        if (!product.productName.trim()) {
            errors.productName = "Введите название товара";
            isValid = false;
        }
        if (!product.productCategory.trim()) {
            errors.productCategory = "Введите категорию товара";
            isValid = false;
        }
        if (!product.manufacturer.trim()) {
            errors.manufacturer = "Введите производителя";
            isValid = false;
        }
        if (!product.price) {
            errors.price = "Введите цену";
            isValid = false;
        } else if (isNaN(product.price)) {
            errors.price = "Цена должна быть числом";
            isValid = false;
        }
        if (!product.stockQuantity) {
            errors.stockQuantity = "Введите количество";
            isValid = false;
        } else if (isNaN(product.stockQuantity)) {
            errors.stockQuantity = "Количество должно быть числом";
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!validateFields()) {
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            await axios.post("http://localhost:8080/product", product);
            setSuccess("Товар успешно добавлен! Перенаправляем...");

            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Ошибка при добавлении товара");
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
                borderColor: "#42a5f5", // Голубой цвет вместо зеленого
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
          linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
          url(${backgroundImage}) no-repeat center center fixed
        `,
                backgroundSize: "cover",
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
                        bgcolor: "rgba(30, 30, 30, 0.85)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.15)",
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box textAlign="center" mb={2} sx={{ width: '100%' }}>
                        <AddIcon sx={{
                            fontSize: 42,
                            color: "#42a5f5", // Голубой цвет
                            mb: 0.8,
                            filter: "drop-shadow(0 0 6px rgba(66, 165, 245, 0.5))"
                        }} />
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                color: "#fff",
                                fontWeight: 700,
                                letterSpacing: 1,
                                fontSize: '1.8rem',
                                mb: 0.5,
                                textShadow: "0 1px 3px rgba(0,0,0,0.5)"
                            }}
                        >
                            Добавление товара
                        </Typography>
                        <Typography variant="body2" sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: '0.85rem'
                        }}>
                            Заполните все поля для добавления нового товара
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
                        onSubmit={onSubmit}
                        noValidate
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Button
                            variant="outlined"
                            component="label"
                            startIcon={<ImageIcon />}
                            sx={{
                                mb: 2,
                                color: "#fff",
                                borderColor: "rgba(255,255,255,0.2)",
                                '&:hover': {
                                    borderColor: "#42a5f5", // Голубой цвет
                                    backgroundColor: "rgba(66, 165, 245, 0.1)",
                                },
                                width: '100%',
                                maxWidth: '400px'
                            }}
                        >
                            Загрузить изображение
                            <input
                                type="file"
                                hidden
                                onChange={onFileChange}
                            />
                        </Button>

                        <TextField
                            margin="dense"
                            required
                            label="Название товара"
                            name="productName"
                            value={product.productName}
                            onChange={onInputChange}
                            error={!!fieldErrors.productName}
                            helperText={fieldErrors.productName}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AddIcon sx={{
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
                            label="Категория"
                            name="productCategory"
                            value={product.productCategory}
                            onChange={onInputChange}
                            error={!!fieldErrors.productCategory}
                            helperText={fieldErrors.productCategory}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CategoryIcon sx={{
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
                            label="Производитель"
                            name="manufacturer"
                            value={product.manufacturer}
                            onChange={onInputChange}
                            error={!!fieldErrors.manufacturer}
                            helperText={fieldErrors.manufacturer}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <FactoryIcon sx={{
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
                            label="Цена"
                            name="price"
                            type="number"
                            value={product.price}
                            onChange={onInputChange}
                            error={!!fieldErrors.price}
                            helperText={fieldErrors.price}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AttachMoneyIcon sx={{
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
                            label="Количество на складе"
                            name="stockQuantity"
                            type="number"
                            value={product.stockQuantity}
                            onChange={onInputChange}
                            error={!!fieldErrors.stockQuantity}
                            helperText={fieldErrors.stockQuantity}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <StorageIcon sx={{
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
                                bgcolor: "#42a5f5", // Голубой цвет
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#42a5f5",
                                    bgcolor: "#1976d2", // Темнее голубой
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 4px 8px rgba(66, 165, 245, 0.3)",
                                },
                                fontSize: "0.95rem",
                                fontWeight: 600,
                                width: '100%',
                                maxWidth: '400px'
                            }}
                            disabled={loading}
                            startIcon={loading ?
                                <CircularProgress size={18} /> :
                                <AddIcon sx={{ fontSize: 20 }} />
                            }
                        >
                            {loading ? "Добавляем..." : "Добавить товар"}
                        </Button>

                        <Divider sx={{
                            my: 1.5,
                            borderColor: "rgba(255,255,255,0.15)",
                            borderBottomWidth: 2,
                            width: '100%',
                            maxWidth: '400px'
                        }} />

                        <Button
                            component={Link}
                            to="/"
                            variant="outlined"
                            sx={{
                                py: 0.9,
                                fontSize: '0.85rem',
                                borderColor: "rgba(255,255,255,0.2)",
                                color: "#fff",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    borderColor: "#42a5f5", // Голубой цвет
                                    backgroundColor: "rgba(66, 165, 245, 0.1)",
                                    transform: "translateY(-2px)",
                                },
                                width: '100%',
                                maxWidth: '400px'
                            }}
                            startIcon={<ArrowBackIcon sx={{ fontSize: 18 }} />}
                        >
                            Вернуться на главную
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}