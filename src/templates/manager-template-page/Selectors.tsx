import { useState, useEffect } from 'react'
import Selector from './Selector'
import FindRpdTemplates from './FindRpdTemplates';

const Selectors = () => {
    const [institute, setInstitute] = useState(null);
    const [level, setLevel] = useState(null);
    const [direction, setDirection] = useState(null);
    const [educationForm, setEducationForm] = useState(null);
    const [enrollmentYear, setEnrollmentYear] = useState(null);
    const [educationYear, setEducationYear] = useState(null);

    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('./json_profiles.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const jsonData = await response.json();
            setData(jsonData);
        };

        fetchData();
    }, []);

    const setInstituteValue = (value) => {
        setInstitute(value);
        setLevel(null);
        setDirection(null);
        setEducationForm(null);
        setEnrollmentYear(null);
    }

    const setLevelValue = (value) => {
        setLevel(value);
        setDirection(null);
        setEducationForm(null);
        setEnrollmentYear(null);
    }

    const setDirectionValue = (value) => {
        setDirection(value);
        setEducationForm(null);
        setEnrollmentYear(null);
    }

    const setEducationFormValue = (value) => {
        setEducationForm(value);
        setEnrollmentYear(null);
    }

    const setEnrollmentYearValue = (value) => {
        setEnrollmentYear(value);
    }

    const setEducationYearValue= (value) => {
        setEducationYear(value)
    }


    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <Selector
                title="Подразделение (институт или факультет)"
                options={Object.keys(data)}
                onSelect={setInstituteValue}
            />
            {institute && (
                <Selector
                    title="Уровень образования"
                    options={Object.keys(data[institute])}
                    onSelect={setLevelValue}
                />
            )}
            {level && (
                <Selector
                    title="Образовательная программа (направление)"
                    options={Object.keys(data[institute][level])}
                    onSelect={setDirectionValue}
                />
            )}
            {direction && (
                <Selector
                    title="Профиль"
                    options={Object.keys(data[institute][level][direction])}
                    onSelect={setEducationFormValue}
                />
            )}
            {educationForm && (
                <Selector
                    title="Форма обучения"
                    options={Object.keys(data[institute][level][direction][educationForm])}
                    onSelect={setEnrollmentYearValue}
                />
            )}
            {enrollmentYear && (
                <Selector
                    title="Год набора"
                    options={Object.values(data[institute][level][direction][educationForm][enrollmentYear])}
                    onSelect={setEducationYearValue}
                />
            )}
            {educationYear && 
                <FindRpdTemplates 
                    institute={institute} 
                    level={level} 
                    direction={direction} 
                    educationForm={educationForm} 
                    enrollmentYear={enrollmentYear} 
                    educationYear={educationYear}
                />
            }
        </div>
    );
};

export default Selectors;