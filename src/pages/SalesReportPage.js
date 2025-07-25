// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// import { getUserIdFromToken } from "../utils/jwt";

// const SalesReportPage = () => {
//     const [salesData, setSalesData] = useState([]);
//     const [showChart, setShowChart] = useState(true);
//     const userId = getUserIdFromToken();

//     useEffect(() => {
//         axios.get(`http://localhost:8080/api/purchases/user/${userId}`)
//             .then((res) => {
//                 const formatted = res.data.map(sale => ({
//                     date: sale.date,
//                     payAmount: sale.payAmount,
//                     quantity: sale.quantity,
//                     productName: sale.product.productName
//                 }));
//                 setSalesData(formatted);
//             })
//             .catch((err) => console.error("Ошибка загрузки данных: ", err));
//     }, [userId]);

//     return (
//         <Paper elevation={6} sx={{ maxWidth: 1000, margin: "2rem auto", p: 4, borderRadius: 4 }}>
//             <Typography variant="h5" fontWeight="bold" gutterBottom>
//                 📊 Отчёт по продажам сотрудника
//             </Typography>

//             <Box textAlign="right" mb={2}>
//                 <Button variant="outlined" onClick={() => setShowChart(!showChart)}>
//                     {showChart ? "Показать таблицу" : "Показать график"}
//                 </Button>
//             </Box>

//             {showChart ? (
//                 <ResponsiveContainer width="100%" height={400}>
//                     <LineChart data={salesData}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="date" />
//                         <YAxis />
//                         <Tooltip />
//                         <Line type="monotone" dataKey="payAmount" name="Сумма оплаты" stroke="#1976d2" strokeWidth={2} />
//                     </LineChart>
//                 </ResponsiveContainer>
//             ) : (
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>Дата</TableCell>
//                                 <TableCell>Товар</TableCell>
//                                 <TableCell>Количество</TableCell>
//                                 <TableCell>Сумма оплаты (BYN)</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {salesData.map((row, idx) => (
//                                 <TableRow key={idx}>
//                                     <TableCell>{row.date}</TableCell>
//                                     <TableCell>{row.productName}</TableCell>
//                                     <TableCell>{row.quantity}</TableCell>
//                                     <TableCell>{row.payAmount.toFixed(2)}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             )}
//         </Paper>
//     );
// };

// export default SalesReportPage;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from "@mui/material";
// import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// import { getUserIdFromToken } from "../utils/jwt";

// // Стили для компонента
// const styles = {
//     pageContainer: {
//         minHeight: '92vh',
//         backgroundImage: `url(${require('../images/reports.jpg')})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundAttachment: 'fixed',
//         padding: '20px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     transparentPaper: {
//         backgroundColor: 'rgba(255, 255, 255, 0.5)',
//         backdropFilter: 'blur(9px)',
//         width: '100%',
//         maxWidth: 1000,
//         borderRadius: '16px',
//         padding: '24px'
//     }
// };

// const SalesReportPage = () => {
//     const [salesData, setSalesData] = useState([]);
//     const [showChart, setShowChart] = useState(true);
//     const userId = getUserIdFromToken();

//     useEffect(() => {
//         axios.get(`http://localhost:8080/api/purchases/user/${userId}`)
//             .then((res) => {
//                 const formatted = res.data.map(sale => ({
//                     date: sale.date,
//                     payAmount: sale.payAmount,
//                     quantity: sale.quantity,
//                     productName: sale.product.productName
//                 }));
//                 setSalesData(formatted);
//             })
//             .catch((err) => console.error("Ошибка загрузки данных: ", err));
//     }, [userId]);

//     // Функция для агрегации данных по датам (только для графика)
//     const aggregateDataByDate = (data) => {
//         const aggregated = {};

//         data.forEach(sale => {
//             if (!aggregated[sale.date]) {
//                 aggregated[sale.date] = {
//                     date: sale.date,
//                     payAmount: 0,
//                     quantity: 0
//                 };
//             }
//             aggregated[sale.date].payAmount += sale.payAmount;
//             aggregated[sale.date].quantity += sale.quantity;
//         });

//         return Object.values(aggregated);
//     };

//     return (
//         <div style={styles.pageContainer}>
//             <Paper elevation={6} sx={styles.transparentPaper}>
//                 <Typography variant="h5" fontWeight="bold" gutterBottom>
//                     Отчёт по Вашим продажам
//                 </Typography>

//                 <Box textAlign="right" mb={2}>
//                     <Button variant="outlined" onClick={() => setShowChart(!showChart)}>
//                         {showChart ? "Показать таблицу" : "Показать график"}
//                     </Button>
//                 </Box>

//                 {showChart ? (
//                     <ResponsiveContainer width="100%" height={400}>
//                         <LineChart data={aggregateDataByDate(salesData)}>
//                             <CartesianGrid strokeDasharray="3 3" />
//                             <XAxis dataKey="date" />
//                             <YAxis />
//                             <Tooltip
//                                 formatter={(value) => [`${value.toFixed(2)} BYN`, "Сумма"]}
//                                 labelFormatter={(date) => `Дата: ${date}`}
//                             />
//                             <Line
//                                 type="monotone"
//                                 dataKey="payAmount"
//                                 name="Сумма оплаты"
//                                 stroke="#1976d2"
//                                 strokeWidth={2}
//                                 dot={{ r: 6 }}
//                                 activeDot={{ r: 8 }}
//                             />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 ) : (
//                     <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell>Дата</TableCell>
//                                     <TableCell>Товар</TableCell>
//                                     <TableCell>Количество</TableCell>
//                                     <TableCell>Сумма оплаты (BYN)</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {salesData.map((row, idx) => (
//                                     <TableRow key={idx}>
//                                         <TableCell>{row.date}</TableCell>
//                                         <TableCell>{row.productName}</TableCell>
//                                         <TableCell>{row.quantity}</TableCell>
//                                         <TableCell>{row.payAmount.toFixed(2)}</TableCell>
//                                     </TableRow>
//                                 ))}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 )}
//             </Paper>
//         </div>
//     );
// };

// export default SalesReportPage;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Paper, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Box, Pagination
} from "@mui/material";
import {
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { getUserIdFromToken } from "../utils/jwt";

// Стили
const styles = {
    pageContainer: {
        minHeight: '92vh',
        backgroundImage: `url(${require('../images/reports.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    transparentPaper: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(9px)',
        width: '100%',
        maxWidth: 1000,
        borderRadius: '16px',
        padding: '24px'
    }
};

const SalesReportPage = () => {
    const [salesData, setSalesData] = useState([]);
    const [showChart, setShowChart] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const userId = getUserIdFromToken();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/purchases/user/${userId}`)
            .then((res) => {
                const formatted = res.data.map(sale => ({
                    date: sale.date,
                    payAmount: sale.payAmount,
                    quantity: sale.quantity,
                    productName: sale.product.productName
                }));

                // Сортировка по дате (сначала ближайшие)
                formatted.sort((a, b) => new Date(b.date) - new Date(a.date));

                setSalesData(formatted);
            })
            .catch((err) => console.error("Ошибка загрузки данных: ", err));
    }, [userId]);

    const aggregateDataByDate = (data) => {
        const aggregated = {};
        data.forEach(sale => {
            if (!aggregated[sale.date]) {
                aggregated[sale.date] = { date: sale.date, payAmount: 0, quantity: 0 };
            }
            aggregated[sale.date].payAmount += sale.payAmount;
            aggregated[sale.date].quantity += sale.quantity;
        });
        return Object.values(aggregated);
    };

    // Постраничная навигация
    const totalPages = Math.ceil(salesData.length / rowsPerPage);
    const paginatedData = salesData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    return (
        <div style={styles.pageContainer}>
            <Paper elevation={6} sx={styles.transparentPaper}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Отчёт по Вашим продажам
                </Typography>

                <Box textAlign="right" mb={2}>
                    <Button variant="outlined" onClick={() => setShowChart(!showChart)}>
                        {showChart ? "Показать таблицу" : "Показать график"}
                    </Button>
                </Box>

                {showChart ? (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={aggregateDataByDate(salesData)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip
                                formatter={(value) => [`${value.toFixed(2)} BYN`, "Сумма"]}
                                labelFormatter={(date) => `Дата: ${date}`}
                            />
                            <Line
                                type="monotone"
                                dataKey="payAmount"
                                name="Сумма оплаты"
                                stroke="#1976d2"
                                strokeWidth={2}
                                dot={{ r: 6 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <>
                        <TableContainer component={Paper} sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Дата</TableCell>
                                        <TableCell>Товар</TableCell>
                                        <TableCell>Количество</TableCell>
                                        <TableCell>Сумма оплаты (BYN)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {paginatedData.map((row, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell>{row.date}</TableCell>
                                            <TableCell>{row.productName}</TableCell>
                                            <TableCell>{row.quantity}</TableCell>
                                            <TableCell>{row.payAmount.toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box mt={2} display="flex" justifyContent="center">
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(e, page) => setCurrentPage(page)}
                                color="primary"
                            />
                        </Box>
                    </>
                )}
            </Paper>
        </div>
    );
};

export default SalesReportPage;
