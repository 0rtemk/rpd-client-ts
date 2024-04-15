import { useEffect, useState } from "react";
import axios from "axios";

function FindRpdTemplates({ institute, level, direction, educationForm, enrollmentYear, educationYear }) {
    const [resData, setResData] = useState(null);

    useEffect(() => {
        // Функция для отправки запроса
        const fetchRpdData = async () => {
            try {
                const response = await axios.get('/api/find-rpd', {
                    params: {
                        institute: institute,
                        level: level,
                        direction: direction,
                        educationForm: educationForm,
                        enrollmentYear: enrollmentYear,
                        educationYear: educationYear
                      }
                });
                console.log('Данные получены:', response.data);
                setResData(response.data);
                // Обработка полученных данных
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                setResData(error);
            }
        };
        // Вызов функции fetchRpdData
        fetchRpdData();
    }, []); // Пустой массив зависимостей означает, что эффект выполнится один раз после монтирования компонента

    return (
        <div></div>
    );
}

export default FindRpdTemplates;