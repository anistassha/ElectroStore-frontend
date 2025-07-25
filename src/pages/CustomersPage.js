import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    CircularProgress,
    Snackbar,
    Alert,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Person as PersonIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Male as MaleIcon,
    Female as FemaleIcon
} from '@mui/icons-material';

const API_URL = 'http://localhost:8080/customers';

const CustomersPage = () => {
    const [customers, setCustomers] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState({
        customerId: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        gender: 'male'
    });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const fetchCustomers = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Ошибка загрузки');
            const data = await response.json();
            setCustomers(data);
        } catch (error) {
            showSnackbar(error.message, 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleAddClick = () => {
        setCurrentCustomer({
            id: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',
            gender: 'male'
        });
        setOpenDialog(true);
    };

    const handleEditClick = (customer) => {
        setCurrentCustomer(customer);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentCustomer(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            const method = currentCustomer.customerId ? 'PUT' : 'POST';
            const url = currentCustomer.customerId ? `${API_URL}/${currentCustomer.customerId}` : API_URL;

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(currentCustomer),
            });

            if (!response.ok) throw new Error('Ошибка сохранения');

            fetchCustomers();
            setOpenDialog(false);
            showSnackbar(
                currentCustomer.customerId ? 'Клиент обновлен' : 'Клиент добавлен',
                'success'
            );
        } catch (error) {
            showSnackbar(error.message, 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Ошибка удаления');

            fetchCustomers();
            showSnackbar('Клиент удален', 'success');
        } catch (error) {
            showSnackbar(error.message, 'error');
        }
    };

    const showSnackbar = (message, severity) => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const getGenderIcon = (gender) => {
        return gender === 'female' ?
            <FemaleIcon color="secondary" /> :
            <MaleIcon color="primary" />;
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                Клиенты магазина
            </Typography>

            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddClick}
                sx={{ mb: 3 }}
            >
                Добавить клиента
            </Button>

            {loading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer component={Paper} elevation={3}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
                            <TableRow>
                                <TableCell>Клиент</TableCell>
                                <TableCell>Пол</TableCell>
                                <TableCell>Телефон</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Действия</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar sx={{
                                                mr: 2,
                                                bgcolor: customer.gender === 'female' ? '#f48fb1' : '#4caf50'
                                            }}>
                                                {customer.firstName?.charAt(0)}
                                            </Avatar>
                                            {customer.firstName} {customer.lastName}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {getGenderIcon(customer.gender)}
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <PhoneIcon sx={{ mr: 1, color: '#616161' }} />
                                            {customer.phoneNumber}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditClick(customer)}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(customer.customerId)}>
                                            <DeleteIcon color="error" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Диалог добавления/редактирования */}
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>
                    {currentCustomer.customerId ? 'Редактировать клиента' : 'Новый клиент'}
                </DialogTitle>
                <DialogContent sx={{ pt: 4 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                        <TextField
                            name="firstName"
                            label="Имя"
                            value={currentCustomer.firstName}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            name="lastName"
                            label="Фамилия"
                            value={currentCustomer.lastName}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            required
                        />
                    </Box>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Пол</InputLabel>
                        <Select
                            name="gender"
                            value={currentCustomer.gender}
                            label="Пол"
                            onChange={handleChange}
                        >
                            <MenuItem value="male">Мужской</MenuItem>
                            <MenuItem value="female">Женский</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="phoneNumber"
                        label="Телефон"
                        value={currentCustomer.phoneNumber}
                        onChange={handleChange}
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        InputProps={{
                            startAdornment: (
                                <PhoneIcon sx={{ color: '#616161', mr: 1 }} />
                            )
                        }}
                    />
                    <TextField
                        name="email"
                        label="Email"
                        value={currentCustomer.email}
                        onChange={handleChange}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <EmailIcon sx={{ color: '#616161', mr: 1 }} />
                            )
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Отмена</Button>
                    {/* <Button onClick={handleSave} variant="contained">
                        Сохранить
                    </Button> */}

                    <Button
                        onClick={handleSave}
                        variant="contained"
                        disabled={!currentCustomer.firstName || !currentCustomer.lastName || !currentCustomer.phoneNumber}
                    >
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Уведомление */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CustomersPage;