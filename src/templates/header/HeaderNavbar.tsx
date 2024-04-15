import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../store/store';
import { Tab, Tabs} from '@mui/material';
import { BorderColor, Description, ListAlt } from '@mui/icons-material';

function HeaderNavbar() {
    const { jsonData } = useStore();
    const [value, setValue] = useState(location.pathname);
    const [isTeacherInterface, setIsTeacherInterface] = useState(true);

    useEffect(() => {
        Object.keys(jsonData).length ? setIsTeacherInterface(false) : setIsTeacherInterface(true);
    }, [jsonData]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label="navbar"
        >
            <Tab
                label="Интерфейс РОП"
                icon={<ListAlt />}
                iconPosition="end"
                component={Link}
                to="/manager"
                value="/manager"
            />
            <Tab
                label="Интерфейс преподавателя"
                icon={<Description />}
                iconPosition="end"
                component={Link}
                to="/teacher-interface"
                value="/teacher-interface"
                disabled={isTeacherInterface}
            />
            <Tab
                label="Шаблон РПД"
                icon={<BorderColor />}
                iconPosition="end"
                component={Link}
                to="/rpd-template"
                value="/rpd-template"
            />
        </Tabs>
    )
}

export default HeaderNavbar;