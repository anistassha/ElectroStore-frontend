// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import './Products.css';

// export default function Products() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         loadProducts();
//     }, []);

//     const loadProducts = async () => {
//         const result = await axios.get("http://localhost:8080/products");
//         setProducts(result.data);
//     };

//     const deleteProduct = async (id) => {
//         await axios.delete(`http://localhost:8080/product/${id}`);
//         loadProducts();
//     };

//     return (
//         <div className='container'>
//             <div className='py-4'>
//                 <div className='product-grid'>
//                     {products.map((product, index) => (
//                         <div key={index} className='card'>
//                             <div className='card-body'>
//                                 <div className='image-container'>
//                                     {product.image ? (
//                                         <img src={product.image} alt={product.productName} className='card-img-top' />
//                                     ) : (
//                                         <div className='no-image'>Фото нет</div>
//                                     )}
//                                 </div>
//                                 <h5 className='card-title'>{product.productName}</h5>
//                                 <h6 className='card-subtitle mb-2 text-muted'>Цена: {product.price} руб.</h6>
//                                 <p className='card-text'>На складе: {product.stockQuantity}</p>
//                                 <div className='button-container'>
//                                     <button className='btn btn-primary'>View</button>
//                                     <Link className='btn btn-outline-primary' to={`/editproduct/${product.productId}`}>Edit</Link>
//                                     <button className='btn btn-danger' onClick={() => deleteProduct(product.productId)}>Delete</button>
//                                 </div>
//                             </div>

//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>


//     );
// }

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
// import {
//     Box,
//     Pagination,
//     Grid,
//     Card,
//     CardContent,
//     Typography,
//     IconButton,
// } from '@mui/material';

// export default function Products() {
//     const [products, setProducts] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [productsPerPage] = useState(3);

//     useEffect(() => {
//         loadProducts();
//     }, []);

//     const loadProducts = async () => {
//         const result = await axios.get('http://localhost:8080/products');
//         setProducts(result.data);
//     };

//     const deleteProduct = async (id) => {
//         await axios.delete(`http://localhost:8080/product/${id}`);
//         loadProducts();
//     };

//     const indexOfLastProduct = currentPage * productsPerPage;
//     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//     const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
//     const totalPages = Math.ceil(products.length / productsPerPage);

//     const handlePageChange = (event, value) => {
//         setCurrentPage(value);
//     };

//     return (
//         <Box sx={{ padding: 4, backgroundColor: '#F0F8FF', minHeight: '100vh' }}>
//             <Typography variant="h4" align="center" gutterBottom>
//                 Каталог товаров
//             </Typography>

//             <Grid container spacing={8} justifyContent="center">
//                 {currentProducts.map((product) => (
//                     <Grid item key={product.productId}>
//                         <Card
//                             sx={{
//                                 height: 440,
//                                 width: 300,
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 justifyContent: 'space-between',
//                                 padding: 2,
//                                 boxShadow: 3,
//                                 backgroundColor: '#F5FFFA',
//                                 transition: 'transform 0.3s, box-shadow 0.3s',
//                                 '&:hover': {
//                                     transform: 'scale(1.03)',
//                                     boxShadow: 6,
//                                 },
//                             }}
//                         >
//                             <Box
//                                 sx={{
//                                     height: 200,
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     mb: 2,
//                                     backgroundColor: product.image ? 'transparent' : '#f5f5f5',
//                                 }}
//                             >
//                                 {product.image ? (
//                                     <Box
//                                         component="img"
//                                         src={product.image}
//                                         alt={product.productName}
//                                         sx={{
//                                             maxHeight: '100%',
//                                             maxWidth: '100%',
//                                             objectFit: 'contain',
//                                         }}
//                                     />
//                                 ) : (
//                                     <Typography color="text.secondary">Фото нет</Typography>
//                                 )}
//                             </Box>

//                             <CardContent sx={{ flexGrow: 1 }}>
//                                 <Typography variant="h6">{product.productName}</Typography>
//                                 <Typography variant="body2" color="text.secondary">
//                                     Цена: {product.price} руб.
//                                 </Typography>
//                                 <Typography variant="body2">
//                                     На складе: {product.stockQuantity}
//                                 </Typography>
//                             </CardContent>

//                             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                                 <IconButton
//                                     component={Link}
//                                     to={`/editproduct/${product.productId}`}
//                                     color="info"
//                                     title="Edit"
//                                 >
//                                     <FaEdit />
//                                 </IconButton>
//                                 <IconButton
//                                     color="error"
//                                     onClick={() => deleteProduct(product.productId)}
//                                     title="Delete"
//                                 >
//                                     <FaTrash />
//                                 </IconButton>
//                             </Box>
//                         </Card>
//                     </Grid>
//                 ))}
//             </Grid>

//             {totalPages > 1 && (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                     <Pagination
//                         count={totalPages}
//                         page={currentPage}
//                         onChange={handlePageChange}
//                         color="primary"
//                         shape="rounded"
//                         showFirstButton
//                         showLastButton
//                     />
//                 </Box>
//             )}
//         </Box>
//     );
// }
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { TextField, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from "@mui/icons-material/AddBox";

import {
    Box,
    Pagination,
    Grid,
    Card,
    CardContent,
    Typography,
    IconButton,
    Chip,
    Skeleton,
    useTheme
} from '@mui/material';

export default function Products() {
    const theme = useTheme();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const productsPerPage = 3;

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            const result = await axios.get('http://localhost:8080/products');
            setProducts(result.data);
        } catch (error) {
            console.error("Error loading products:", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/product/${id}`);
            loadProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);


    // const indexOfLastProduct = currentPage * productsPerPage;
    // const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    // const totalPages = Math.ceil(products.length / productsPerPage);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Box sx={{
            padding: 4,
            minHeight: '92vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}>

            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 4
                }}
            >
                <Box sx={{ position: 'absolute', left: 0 }}>
                    <Link to="/addproduct" style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained"
                            startIcon={<AddBoxIcon sx={{ mr: 1 }} />}
                            sx={{
                                borderRadius: '30px',
                                padding: '8px 20px',
                                backgroundColor: theme.palette.success.main,
                                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: theme.palette.success.dark,
                                    transform: 'translateY(-1px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            Добавить товар
                        </Button>
                    </Link>
                </Box>


                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.dark,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                    }}
                >
                    Каталог товаров
                </Typography>

                <TextField
                    variant="outlined"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}

                    sx={{
                        position: 'absolute',
                        right: 0,
                        maxWidth: 300,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        borderRadius: '50px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                        backdropFilter: 'blur(4px)',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '50px'
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <SearchIcon sx={{ color: theme.palette.primary.main }} />
                        )
                    }}
                />
            </Box>

            {loading ? (
                <Grid container spacing={4} justifyContent="center">
                    {[...Array(productsPerPage)].map((_, index) => (
                        <Grid item key={index}>
                            <Skeleton variant="rectangular" width={300} height={440} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <>
                    <Grid container spacing={4} justifyContent="center">
                        {currentProducts.map((product, index) => (
                            <Grid item key={product.productId}>
                                <Card
                                    sx={{
                                        height: 440,
                                        width: 300,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        padding: 2,
                                        borderRadius: 3,
                                        boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                        background: 'rgba(255, 255, 255, 0.9)',
                                        backdropFilter: 'blur(5px)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: '0 15px 30px rgba(0,0,0,0.2)'
                                        },
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: 200,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mb: 2,
                                            borderRadius: 2,
                                            overflow: 'hidden',
                                            backgroundColor: product.image ? 'transparent' : '#f5f5f5',
                                            position: 'relative'
                                        }}
                                    >
                                        {product.image ? (
                                            <Box
                                                component="img"
                                                src={product.image}
                                                alt={product.productName}
                                                sx={{
                                                    maxHeight: '100%',
                                                    maxWidth: '100%',
                                                    objectFit: 'contain',
                                                    transition: 'transform 0.3s',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)'
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <Typography color="text.secondary">Фото нет</Typography>
                                        )}
                                        {product.stockQuantity <= 5 && (
                                            <Chip
                                                label="Заканчивается"
                                                color="warning"
                                                size="small"
                                                sx={{ position: 'absolute', top: 8, right: 8 }}
                                            />
                                        )}
                                    </Box>

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                            {product.productName}
                                        </Typography>
                                        <Typography variant="body1" sx={{ fontWeight: 700, color: theme.palette.primary.main, mb: 1 }}>
                                            {product.price} руб.
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            На складе: {product.stockQuantity} шт.
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        gap: 2
                                    }}>
                                        <IconButton
                                            component={Link}
                                            to={`/editproduct/${product.productId}`}
                                            color="info"
                                            title="Редактировать"
                                            sx={{
                                                backgroundColor: theme.palette.info.light,
                                                '&:hover': { backgroundColor: theme.palette.info.main }
                                            }}
                                        >
                                            <FaEdit style={{ color: 'white' }} />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            onClick={() => deleteProduct(product.productId)}
                                            title="Удалить"
                                            sx={{
                                                backgroundColor: theme.palette.error.light,
                                                '&:hover': { backgroundColor: theme.palette.error.main }
                                            }}
                                        >
                                            <FaTrash style={{ color: 'white' }} />
                                        </IconButton>
                                    </Box>
                                </Card>

                            </Grid>
                        ))}
                    </Grid>

                    {totalPages > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                                shape="rounded"
                                showFirstButton
                                showLastButton
                                sx={{
                                    '& .MuiPaginationItem-root': {
                                        fontWeight: 600,
                                    },
                                    '& .Mui-selected': {
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                    }
                                }}
                            />
                        </Box>
                    )}
                </>
            )}
        </Box>
    );
}