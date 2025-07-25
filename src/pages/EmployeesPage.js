import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Container,
    Typography,
    CircularProgress,
    Alert,
    Chip,
    Box
} from '@mui/material';

import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
    return localStorage.getItem('token');
};

export const getUserIdFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = jwtDecode(token);
    // const decoded = decodeJWT(token);
    return decoded?.userId;
};

export const getUserRoleFromToken = () => {
    const token = getToken();
    if (!token) return null;

    const decoded = jwtDecode(token);
    // const decoded = decodeJWT(token);
    return decoded?.role;
};

const EmployeesPage = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const currentUserId = getUserIdFromToken();
    const currentUserRole = getUserRoleFromToken();
    const token = getToken();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/users');
                setEmployees(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEmployees();
    }, []);

    const toggleRole = async (userId) => {
        try {
            await axios.put(`http://localhost:8080/api/users/${userId}/toggle-role`);
            const response = await axios.get('http://localhost:8080/api/users');
            setEmployees(response.data);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <CircularProgress sx={{ display: 'block', margin: '20px auto' }} />;
    if (error) return <Alert severity="error" sx={{ margin: 2 }}>{error}</Alert>;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                Список сотрудников
                {currentUserRole === 'ADMIN' && (
                    <Chip
                        label="Вы администратор"
                        color="primary"
                        size="small"
                        sx={{ ml: 2, fontWeight: 'bold' }}
                    />
                )}
            </Typography>

            <TableContainer component={Paper} elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'background.default' }}>
                            <TableCell>ID</TableCell>
                            <TableCell>Логин</TableCell>
                            <TableCell>Роль</TableCell>
                            <TableCell>ФИО</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Телефон</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => {
                            const isCurrentUser = currentUserId === employee.id;
                            const isAdmin = employee.role === 'ADMIN';

                            return (
                                <TableRow
                                    key={employee.id}
                                    hover
                                    sx={{
                                        bgcolor: isCurrentUser ? 'rgba(25, 118, 210, 0.08)' : 'inherit',
                                        '&:hover': {
                                            bgcolor: isCurrentUser ? 'rgba(25, 118, 210, 0.12)' : 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }}
                                >
                                    <TableCell>{employee.id}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {employee.username}
                                            {isCurrentUser && (
                                                <Chip
                                                    label="Вы"
                                                    size="small"
                                                    sx={{
                                                        ml: 1,
                                                        bgcolor: 'primary.main',
                                                        color: 'white',
                                                        fontWeight: 'bold'
                                                    }}
                                                />
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Chip
                                                label={employee.role}
                                                color={isAdmin ? 'primary' : 'default'}
                                                size="small"
                                            />
                                            {isAdmin && isCurrentUser && (
                                                <Chip
                                                    label="Ваша роль"
                                                    color="success"
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            )}
                                        </Box>
                                    </TableCell>
                                    <TableCell>
                                        {employee.employee?.name || '-'} {employee.employee?.surname || '-'}
                                    </TableCell>
                                    <TableCell>{employee.employee?.email || '-'}</TableCell>
                                    <TableCell>{employee.employee?.telephone_number || '-'}</TableCell>
                                    <TableCell>
                                        {isCurrentUser ? (
                                            <Typography variant="body2" color="text.secondary">
                                                Ваш аккаунт
                                            </Typography>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => toggleRole(employee.id)}
                                                sx={{
                                                    minWidth: 120,
                                                    bgcolor: isAdmin ? 'error.light' : 'success.light',
                                                    '&:hover': {
                                                        bgcolor: isAdmin ? 'error.dark' : 'success.dark'
                                                    }
                                                }}
                                            >
                                                {isAdmin ? 'Понизить' : 'Повысить'}
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default EmployeesPage;