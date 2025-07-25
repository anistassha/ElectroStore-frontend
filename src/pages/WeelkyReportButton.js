import React from "react";

const WeeklyReportButton = () => {
    const handleDownloadReport = async () => {
        try {
            const response = await fetch("http://localhost:8080/report/weekly", {
                method: "GET",
                headers: {
                    Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
            });

            if (!response.ok) {
                throw new Error("Ошибка при получении отчёта");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "weekly-report.xlsx");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Ошибка загрузки отчёта:", error);
            alert("Не удалось загрузить отчёт.");
        }
    };

    return (
        <button
            onClick={handleDownloadReport}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
            Скачать отчёт за неделю
        </button>
    );
};

export default WeeklyReportButton;
