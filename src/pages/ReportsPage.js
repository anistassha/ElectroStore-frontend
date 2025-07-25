import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

import {
    Container,
    Typography,
    TextField,
    Button,
    Alert,
    Paper,
    Box,
    ThemeProvider,
    createTheme,
    CssBaseline,
} from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

const ReportsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [message, setMessage] = useState('');

    const handleTopSellersReport = async () => {
        setIsLoading(true);
        setMessage('');

        try {
            const params = {};
            if (selectedDate) {
                params.date = selectedDate;
            }

            const response = await axios.get(`http://localhost:8080/report/top-sellers`, {
                params,
                responseType: 'blob',
            });

            const today = new Date().toISOString().slice(0, 10);
            const filename = `top_sellers_${today}.docx`;

            saveAs(new Blob([response.data]), filename);
            setMessage('Отчет по топ-продавцам успешно скачан.');
        } catch (error) {
            console.error('Ошибка при генерации Word-отчета:', error);
            setMessage('Ошибка при генерации отчета по топ-продавцам.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleWeeklyExcelReport = async () => {
        try {
            const response = await fetch("http://localhost:8080/report/weekly", {
                method: "GET",
                headers: {
                    Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при получении Excel-отчёта");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "weekly-report.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Ошибка загрузки Excel-отчёта:", error);
            alert("Не удалось загрузить Excel-отчёт.");
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Container maxWidth="sm" sx={{ mt: 5 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Генерация отчетов
                </Typography>

                <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Отчет по топ-продавцам (Word)
                    </Typography>

                    <TextField
                        fullWidth
                        type="date"
                        label="Дата для отчета (необязательно)"
                        InputLabelProps={{ shrink: true }}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        sx={{ mb: 2 }}
                    />

                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleTopSellersReport}
                        disabled={isLoading}
                        startIcon={<DescriptionIcon />}
                    >
                        {isLoading ? 'Генерация...' : 'Скачать отчет (Word)'}
                    </Button>

                    {message && (
                        <Box mt={2}>
                            <Alert severity={message.includes('Ошибка') ? 'error' : 'success'}>
                                {message}
                            </Alert>
                        </Box>
                    )}
                </Paper>

                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Продажи за последнюю неделю (Excel)
                    </Typography>

                    <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        onClick={handleWeeklyExcelReport}
                        startIcon={<DownloadIcon />}
                    >
                        Скачать отчет (Excel)
                    </Button>
                </Paper>
            </Container>
        </ThemeProvider>
    );
};

export default ReportsPage;
