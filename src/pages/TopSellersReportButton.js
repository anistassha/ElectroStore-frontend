import React from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

const TopSellersReportButton = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState('');
  const [message, setMessage] = React.useState('');

  const handleGenerateReport = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      // Формируем параметры запроса
      const params = {};
      if (selectedDate) {
        params.date = selectedDate;
      }

      // Отправляем запрос на генерацию Word-документа
      const response = await axios.get(`http://localhost:8080/report/top-sellers`, {
        params,
        responseType: 'blob' // Важно для получения бинарных данных
      });

      // Создаем имя файла с текущей датой
      const today = new Date().toISOString().slice(0, 10);
      const filename = `top_sellers_${today}.docx`;

      // Сохраняем файл
      saveAs(new Blob([response.data]), filename);

      setMessage('Отчет успешно сгенерирован и скачан');
    } catch (error) {
      console.error('Ошибка при генерации отчета:', error);
      setMessage('Произошла ошибка при генерации отчета');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
      <h3>Отчет по топ-продавцам</h3>

      <div style={{ marginBottom: '15px' }}>
        <label htmlFor="reportDate" style={{ display: 'block', marginBottom: '5px' }}>
          Дата для отчета (необязательно):
        </label>
        <input
          type="date"
          id="reportDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: '8px', width: '100%' }}
        />
      </div>

      <button
        onClick={handleGenerateReport}
        disabled={isLoading}
        style={{
          padding: '10px 15px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          width: '100%'
        }}
      >
        {isLoading ? 'Генерация...' : 'Скачать отчет (Word)'}
      </button>

      {message && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          backgroundColor: message.includes('ошибка') ? '#ffdddd' : '#ddffdd',
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default TopSellersReportButton;